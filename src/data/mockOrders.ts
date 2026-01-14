// Mock orders for testing
// This will be replaced by real API data later

export type OrderStatus = 'en_preparacion' | 'despachado' | 'en_camino' | 'entregado';

export interface MockOrder {
    id: string;
    date: string;
    status: OrderStatus;
    products: {
        productId: string;
        name: string;
        quantity: number;
    }[];
    total?: string;
}

export const mockOrders: MockOrder[] = [
    {
        id: 'COT-2025-001',
        date: '27 de noviembre de 2025',
        status: 'en_preparacion',
        products: [
            { productId: 'PROD-1000', name: 'Dispensador de Papel', quantity: 2 },
            { productId: 'PROD-1001', name: 'Jabón Industrial', quantity: 5 }
        ]
    },
    {
        id: 'COT-2025-002',
        date: '25 de noviembre de 2025',
        status: 'despachado',
        products: [
            { productId: 'PROD-1002', name: 'Toallas de Papel', quantity: 10 }
        ]
    },
    {
        id: 'COT-2025-003',
        date: '20 de noviembre de 2025',
        status: 'entregado',
        products: [
            { productId: 'PROD-1003', name: 'Desinfectante', quantity: 3 }
        ]
    },
    {
        id: 'COT-2025-004',
        date: '15 de noviembre de 2025',
        status: 'entregado',
        products: [
            { productId: 'PROD-1004', name: 'Guantes Industriales', quantity: 20 }
        ]
    },
    {
        id: 'COT-2025-005',
        date: '10 de noviembre de 2025',
        status: 'entregado',
        products: [
            { productId: 'PROD-1005', name: 'Limpiador Multiuso', quantity: 8 }
        ]
    }
];

export const getStatusLabel = (status: OrderStatus): string => {
    const labels: Record<OrderStatus, string> = {
        'en_preparacion': 'En Preparación',
        'despachado': 'Despachado',
        'en_camino': 'En Camino',
        'entregado': 'Entregado'
    };
    return labels[status];
};

export const getStatusColor = (status: OrderStatus): string => {
    const colors: Record<OrderStatus, string> = {
        'en_preparacion': 'bg-yellow-100 text-yellow-800',
        'despachado': 'bg-blue-100 text-blue-800',
        'en_camino': 'bg-purple-100 text-purple-800',
        'entregado': 'bg-green-100 text-green-800'
    };
    return colors[status];
};
