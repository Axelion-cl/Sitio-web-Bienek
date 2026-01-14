'use client';

import { mockOrders, getStatusLabel, getStatusColor } from '@/data/mockOrders';
import { FileText } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';

export function MisOrdenes() {
    const { t } = useLanguage();

    if (mockOrders.length === 0) {
        return (
            <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">{t.miCuenta.noTienesPedidos}</h3>
                <p className="text-gray-500">{t.miCuenta.tusPedidosApareceran}</p>
            </div>
        );
    }

    return (
        <div>
            <p className="text-gray-600 mb-6">
                {t.miCuenta.revisaOrdenes}
            </p>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {mockOrders.map((order, index) => (
                    <div
                        key={order.id}
                        className="bg-gray-100 rounded-lg p-4 border-l-4 border-primary hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-medium text-gray-900">
                                    {t.miCuenta.orden}: {order.id}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {t.miCuenta.fecha}: {order.date}
                                </p>
                            </div>

                            {/* Show status badge only for the first (most recent) order */}
                            {index === 0 && (
                                <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                                    {getStatusLabel(order.status)}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
