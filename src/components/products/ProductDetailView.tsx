'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { getProductById } from '@/services/products';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductInfo } from '@/components/products/ProductInfo';
import { RelatedProducts } from '@/components/products/RelatedProducts'; // Assuming we want related logic here too or pass it down

export function ProductDetailView({ initialProduct }: { initialProduct: Product }) {
    const [product, setProduct] = useState<Product>(initialProduct);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Hydrate with fresh data on mount
    useEffect(() => {
        const fetchFreshData = async () => {
            setIsRefreshing(true);
            try {
                // Fetch fresh data from Supabase directly
                const freshProduct = await getProductById(initialProduct.id);
                if (freshProduct) {
                    // Check if data actually changed to avoid unnecessary renders? 
                    // React handles basic equality, but object structure is complex.
                    // Just set it.
                    setProduct(freshProduct);
                }
            } catch (err) {
                console.error("Error refreshing product data:", err);
            } finally {
                setIsRefreshing(false);
            }
        };

        fetchFreshData();
    }, [initialProduct.id]);

    return (
        <div className="container mx-auto px-4 lg:px-8 pt-6 pb-12">

            {/* Optional: Indicator for Admin/Dev that data is live */}
            {/* {isRefreshing && <div className="fixed top-20 right-4 bg-yellow-400 text-black text-xs px-2 py-1 rounded shadow z-50 animate-pulse">Actualizando...</div>} */}

            {/* 2. Main Product Section: Gallery + Info */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-1">

                {/* Left: Gallery (7 Cols) */}
                <div className="lg:col-span-7">
                    <ProductGallery images={product.images} productName={product.name} />
                </div>

                {/* Right: Critical Info (5 Cols) */}
                <div className="lg:col-span-5 pt-4 flex flex-col gap-12">
                    <ProductInfo product={product} />

                    {/* Description & Specs */}
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div>
                            <h3 className="text-lg font-bold font-outfit uppercase tracking-wider mb-3 border-l-4 border-[#ecec00] pl-3">
                                Descripción del Producto
                            </h3>
                            <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed text-base">
                                <p className="whitespace-pre-line">{product.description}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold font-outfit uppercase tracking-wider mb-4 border-l-4 border-[#ecec00] pl-3 mt-8">
                                Especificaciones Técnicas
                            </h3>
                            {product.specs && Object.keys(product.specs).length > 0 ? (
                                <div className="bg-gray-50 rounded-xl p-5 md:p-6 transition-all duration-300">
                                    <dl className="grid grid-cols-1 gap-y-4">
                                        {Object.entries(product.specs).map(([key, value]) => (
                                            <div key={key} className="border-b border-gray-200 pb-2 last:border-0 last:pb-0 flex justify-between">
                                                <dt className="text-sm font-bold text-gray-900 uppercase">{key}</dt>
                                                <dd className="text-gray-600 text-sm text-right">{value as string}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm italic">Sin especificaciones técnicas detalladas.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
