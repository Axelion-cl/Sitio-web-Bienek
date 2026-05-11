'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import { ShoppingCart, FileText, User, Upload, Loader2, Send } from 'lucide-react';
import { MisProductos } from '@/components/cuenta/MisProductos';
import { MisOrdenes } from '@/components/cuenta/MisOrdenes';
import { MiPerfil } from '@/components/cuenta/MiPerfil';
import { useCart } from '@/context/CartContext';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { createOrder } from '@/services/orders';

type TabType = 'productos' | 'ordenes' | 'perfil';

export default function MiCuentaPage() {
    const { user, isLoggedIn } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>('productos');
    const { cartItems } = useCart();

    // Upload & Sending States
    const [isSendingOrder, setIsSendingOrder] = useState(false);
    const [isUploadingList, setIsUploadingList] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Redirect if not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn || !user) {
        return null;
    }

    const tabs = [
        { id: 'productos' as TabType, label: t.miCuenta.misProductos, icon: ShoppingCart },
        { id: 'ordenes' as TabType, label: t.miCuenta.misOrdenes, icon: FileText },
        { id: 'perfil' as TabType, label: t.miCuenta.miPerfil, icon: User },
    ];

    // --- Logic for Sending Order (Contactar Vendedor) ---
    const handleContactSeller = async () => {
        if (cartItems.length === 0) {
            alert("No tienes productos en tu lista para enviar.");
            return;
        }

        if (!confirm("¿Deseas enviar tu lista de productos de interés al vendedor?")) return;

        setIsSendingOrder(true);
        try {
            // 1. Create order in Supabase first (source of truth)
            const orderItems = cartItems.map(item => ({
                productId: item.product.id,
                productName: item.product.name,
                quantity: 1
            }));

            const orderResult = await createOrder(user.id, orderItems);

            if (!orderResult.success) {
                alert("Error al registrar la solicitud. Por favor intenta nuevamente.");
                return;
            }

            // 2. Try to send email notification via PHP Bridge (non-blocking)
            try {
                const data = cartItems.map(item => ({
                    SKU: item.product.id,
                    Producto: item.product.name,
                    Marca: item.product.brand,
                    Cantidad: 1
                }));

                const worksheet = XLSX.utils.json_to_sheet(data);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Pedido");
                const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                const formData = new FormData();
                formData.append("name", user.name);
                formData.append("email", user.email);
                formData.append("type", "order");
                formData.append("d3", "Pedido Web");
                formData.append("order_id", orderResult.orderId ?? "");
                formData.append("message", "El cliente ha enviado una solicitud de cotización basada en su lista de productos de interés.");
                formData.append("attachment", excelBlob, `Pedido_${user.name.replace(/\s+/g, '_')}_${new Date().getTime()}.xlsx`);

                const PHP_BRIDGE_URL = process.env.NEXT_PUBLIC_PHP_BRIDGE_URL;
                if (PHP_BRIDGE_URL) {
                    await fetch(PHP_BRIDGE_URL, { method: "POST", body: formData });
                }
            } catch {
                // Email failure does not affect order creation
            }

            alert(`¡Solicitud enviada con éxito! Número de orden: ${orderResult.orderId}. Nos pondremos en contacto contigo.`);

        } catch (error) {
            console.error(error);
            alert("Ocurrió un error al procesar tu solicitud.");
        } finally {
            setIsSendingOrder(false);
        }
    };

    // --- Logic for Uploading List ---
    const handleUploadList = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!confirm(`¿Enviar el archivo "${file.name}" com tu listado de compra?`)) {
            e.target.value = ""; // Reset
            return;
        }

        setIsUploadingList(true);
        try {
            const formData = new FormData();
            formData.append("name", user.name);
            formData.append("email", user.email);
            formData.append("type", "order");
            formData.append("d3", "Listado Adjunto");
            formData.append("message", "El cliente ha adjuntado su propio listado de compra.");
            formData.append("attachment", file);

            const PHP_BRIDGE_URL = process.env.NEXT_PUBLIC_PHP_BRIDGE_URL;
            if (!PHP_BRIDGE_URL) throw new Error("No Bridge URL");

            const response = await fetch(PHP_BRIDGE_URL, {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                alert("¡Listado enviado correctamente!");
            } else {
                alert("Error al enviar el listado.");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión.");
        } finally {
            setIsUploadingList(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div className="min-h-[calc(100vh-200px)] bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-outfit text-3xl font-bold text-gray-900 border-l-4 border-primary pl-4">
                        {t.miCuenta.titulo}
                    </h1>
                    <p className="text-gray-600 mt-2 pl-5">
                        {t.miCuenta.bienvenido} {user.name}.
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all whitespace-nowrap ${isActive
                                    ? 'bg-primary text-black border-primary'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-2xl shadow-lg p-8">

                    {/* Section Header with Actions */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h2 className="font-semibold text-xl text-gray-900">
                            {tabs.find(t => t.id === activeTab)?.label}:
                        </h2>

                        {/* Action Buttons (Only for products tab) */}
                        {activeTab === 'productos' && (
                            <div className="flex flex-wrap gap-3">
                                {/* Contactar Vendedor */}
                                <Button
                                    onClick={handleContactSeller}
                                    disabled={isSendingOrder || cartItems.length === 0}
                                    className="bg-primary hover:bg-primary/90 text-black font-medium gap-2"
                                >
                                    {isSendingOrder ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                    Contactar vendedor
                                </Button>

                                {/* Adjuntar Listado */}
                                <div className="relative">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleUploadList}
                                        accept=".xlsx,.xls,.pdf,.doc,.docx"
                                        className="hidden"
                                    />
                                    <Button
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isUploadingList}
                                        variant="outline"
                                        className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                                    >
                                        {isUploadingList ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                        Adjuntar listado de compra
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {activeTab === 'productos' && <MisProductos />}
                    {activeTab === 'ordenes' && <MisOrdenes />}
                    {activeTab === 'perfil' && <MiPerfil />}
                </div>
            </div>
        </div>
    );
}
