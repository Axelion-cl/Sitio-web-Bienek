"use client";

import { Product, getRelatedProducts } from "@/data/mockProducts";
import { ProductCard } from "@/components/soluciones/ProductCard";
import { ChevronRight } from "lucide-react";

interface RelatedProductsProps {
    relatedIds: string[];
}

export function RelatedProducts({ relatedIds }: RelatedProductsProps) {
    const products = getRelatedProducts(relatedIds);

    if (products.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-outfit font-bold text-2xl md:text-3xl text-gray-900">
                        Puede que también te interese
                    </h2>

                    {/* Navigation visual cue */}
                    <div className="hidden md:flex gap-2">
                        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all disabled:opacity-50">
                            <span className="sr-only">Anterior</span>
                            <ChevronRight className="w-5 h-5 rotate-180" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all">
                            <span className="sr-only">Siguiente</span>
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Grid / Carousel */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="h-[420px]">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
