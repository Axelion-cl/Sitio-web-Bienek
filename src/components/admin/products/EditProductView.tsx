'use client';

import { useEffect, useState } from 'react';
import { ProductForm } from '@/components/admin/products/ProductForm';
import { ChevronLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function EditProductView({ productId }: { productId: string }) {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const id = decodeURIComponent(productId);

            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (!error && data) {
                setProduct(data);
            }
            setLoading(false);
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-800">Producto no encontrado</h2>
                <Link href="/admin/products" className="text-primary hover:underline mt-2 inline-block">
                    Volver al listado
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Editar Producto: <span className="text-gray-500 font-normal text-lg">{product.id}</span></h1>
            </div>

            <ProductForm initialData={product} isEditing />
        </div>
    );
}
