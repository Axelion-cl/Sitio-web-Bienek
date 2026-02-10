'use client';

import { useState, useEffect } from 'react';
import { X, Package, Trash2, ChevronDown, Check, AlertCircle, ShoppingCart } from 'lucide-react';
import { OrderWithItems, OrderStatus, orderStatusLabels, orderStatusColors } from '@/types/order';
import { getOrdersByClient, updateOrderStatus, deleteOrder } from '@/services/orders';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ClientOrdersModalProps {
    isOpen: boolean;
    onClose: () => void;
    clientId: string;
    clientName: string;
    currentUserEmail: string; // For audit logging
    onOrdersChange?: () => void; // Notify parent of changes
}

export function ClientOrdersModal({ isOpen, onClose, clientId, clientName, currentUserEmail, onOrdersChange }: ClientOrdersModalProps) {
    const [orders, setOrders] = useState<OrderWithItems[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null); // Order ID being updated
    const [showProducts, setShowProducts] = useState<string | null>(null); // Order ID to show products for

    useEffect(() => {
        if (isOpen && clientId) {
            loadOrders();
        }
    }, [isOpen, clientId]);

    const loadOrders = async () => {
        setLoading(true);
        const data = await getOrdersByClient(clientId);
        setOrders(data);
        setLoading(false);
    };

    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        setUpdating(orderId);
        const result = await updateOrderStatus(orderId, newStatus, currentUserEmail);

        if (result.success) {
            // Update local state
            setOrders(prev => prev.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
            // Notify parent
            if (onOrdersChange) onOrdersChange();
        } else {
            alert('Error al actualizar el estado: ' + result.error);
        }
        setUpdating(null);
    };

    const handleDelete = async (orderId: string) => {
        if (!confirm('¿Estás seguro de que deseas eliminar esta orden? Esta acción no se puede deshacer.')) return;

        setUpdating(orderId);
        const result = await deleteOrder(orderId);

        if (result.success) {
            setOrders(prev => prev.filter(o => o.id !== orderId));
            // Notify parent
            if (onOrdersChange) onOrdersChange();
        } else {
            alert('Error al eliminar la orden: ' + result.error);
        }
        setUpdating(null);
    };

    if (!isOpen) return null;

    const availableStatuses: OrderStatus[] = ['solicitud', 'activa', 'finalizada', 'no_finalizada'];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 rounded-t-2xl">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Package className="w-5 h-5 text-primary" />
                            Órdenes de {clientName}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">Gestión de estados y seguimiento</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">Este cliente no tiene órdenes registradas.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white border boundary-gray-200 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
                                    <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">

                                        {/* Order Info */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="font-mono font-bold text-gray-900 text-lg">
                                                    #{order.id}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {format(new Date(order.created_at), "d MMM yyyy, HH:mm", { locale: es })}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                {/* Status Badge */}
                                                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${orderStatusColors[order.status]}`}>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                                                    {orderStatusLabels[order.status]}
                                                </div>

                                                <span className="text-sm text-gray-500">
                                                    {order.order_items?.length || 0} productos
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-wrap items-center gap-2">
                                            {/* Status Dropdown */}
                                            <div className="relative group">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                                    disabled={updating === order.id}
                                                    className={`appearance-none pl-3 pr-8 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none cursor-pointer disabled:opacity-50 transition-all ${order.status === 'activa' ? 'border-blue-200 text-blue-700' :
                                                        order.status === 'finalizada' ? 'border-green-200 text-green-700' :
                                                            order.status === 'no_finalizada' ? 'border-red-200 text-red-700' :
                                                                'text-gray-700'
                                                        }`}
                                                >
                                                    {availableStatuses.map(status => (
                                                        <option
                                                            key={status}
                                                            value={status}
                                                            /* Rule: Once Active, cannot go back to Request */
                                                            disabled={order.status !== 'solicitud' && status === 'solicitud'}
                                                        >
                                                            {orderStatusLabels[status]}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            </div>

                                            {/* View Products Button */}
                                            <button
                                                onClick={() => setShowProducts(showProducts === order.id ? null : order.id)}
                                                className={`p-2 rounded-lg border transition-colors ${showProducts === order.id
                                                    ? 'bg-primary/10 border-primary text-primary'
                                                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                                                    }`}
                                                title="Ver productos"
                                            >
                                                <ShoppingCart className="w-4 h-4" />
                                            </button>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDelete(order.id)}
                                                disabled={updating === order.id}
                                                className="p-2 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-gray-400 transition-colors disabled:opacity-50"
                                                title="Eliminar orden"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Products Details (Expandable) */}
                                    {showProducts === order.id && (
                                        <OrderItemsManager
                                            orderId={order.id}
                                            items={order.order_items || []}
                                            readOnly={order.status === 'finalizada' || order.status === 'no_finalizada'}
                                            onUpdate={() => loadOrders()} // Reload after change
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl sticky bottom-0">
                    <button
                        onClick={onClose}
                        className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}

// Subcomponent for managing order items
import { addOrderItem, deleteOrderItem, searchProducts4Order } from '@/services/orders';
import { Search, Plus } from 'lucide-react';

function OrderItemsManager({ orderId, items, readOnly, onUpdate }: {
    orderId: string,
    items: any[],
    readOnly: boolean,
    onUpdate: () => void
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [addingId, setAddingId] = useState<string | null>(null);

    // Search debounce logic could be added here, but simple effect for now
    useEffect(() => {
        const delaySearch = setTimeout(async () => {
            if (searchTerm.length >= 2) {
                setIsSearching(true);
                const results = await searchProducts4Order(searchTerm);
                setSearchResults(results);
                setIsSearching(false);
            } else {
                setSearchResults([]);
            }
        }, 300);
        return () => clearTimeout(delaySearch);
    }, [searchTerm]);

    const handleAddItem = async (product: any) => {
        setAddingId(product.id);
        const result = await addOrderItem(orderId, {
            product_id: product.id,
            product_name: product.name,
            quantity: 1
        });

        if (result.success) {
            setSearchTerm(''); // Clear search
            setSearchResults([]);
            onUpdate(); // Refresh parent
        } else {
            alert('Error al agregar producto');
        }
        setAddingId(null);
    };

    const handleDeleteItem = async (itemId: string) => {
        if (!confirm('¿Eliminar producto de la orden?')) return;
        const result = await deleteOrderItem(itemId);
        if (result.success) {
            onUpdate();
        } else {
            alert('Error al eliminar producto');
        }
    };

    return (
        <div className="bg-gray-50 border-t border-gray-100 p-5 animate-in slide-in-from-top-2 duration-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-gray-500" />
                Productos de la orden
            </h4>

            {/* Product Search Bar */}
            {!readOnly && (
                <div className="relative mb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar producto para agregar..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        />
                        {isSearching && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>

                    {/* Search Results Dropdown */}
                    {searchResults.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {searchResults.map(product => (
                                <button
                                    key={product.id}
                                    onClick={() => handleAddItem(product)}
                                    disabled={addingId === product.id}
                                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between group border-b border-gray-50 last:border-0"
                                >
                                    <div>
                                        <div className="font-medium text-sm text-gray-900">{product.name}</div>
                                        <div className="text-xs text-gray-500">{product.brand} - SKU: {product.sku}</div>
                                    </div>
                                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Items List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-2">Producto</th>
                            {!readOnly && <th className="px-4 py-2 text-right w-16">Acción</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {items.length === 0 ? (
                            <tr><td colSpan={2} className="px-4 py-4 text-center text-gray-400 italic">Sin productos</td></tr>
                        ) : items.map((item) => (
                            <tr key={item.id} className="group hover:bg-gray-50">
                                <td className="px-4 py-3 text-gray-900">{item.product_name}</td>
                                {!readOnly && (
                                    <td className="px-4 py-3 text-right">
                                        <button
                                            onClick={() => handleDeleteItem(item.id)}
                                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                            title="Quitar producto"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
