'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';

export function MisProductos() {
    const { cartItems, removeFromCart } = useCart();
    const { t } = useLanguage();

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">{t.miCuenta.carritoVacio}</h3>
                <p className="text-gray-500">{t.miCuenta.agregaProductos}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <p className="text-gray-600 mb-6">
                {t.miCuenta.revisaProductos}
            </p>

            {cartItems.map((item) => (
                <div
                    key={item.product.id}
                    className="flex items-center gap-4 bg-gray-50 rounded-lg p-4 border-l-4 border-primary"
                >
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                        <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                        <p className="text-sm text-gray-500">{item.product.brand}</p>
                    </div>

                    {/* Remove Button */}
                    <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            ))}
        </div>
    );
}
