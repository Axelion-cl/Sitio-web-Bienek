// Mock users for testing authentication
// This will be replaced by Supabase Auth later

export type UserRole = 'client' | 'admin';

export interface MockUser {
    id: string;
    email: string;
    password: string;
    name: string;
    role: UserRole;
}

export const mockUsers: MockUser[] = [
    {
        id: 'user-001',
        email: 'cliente@bienek.cl',
        password: '123456',
        name: 'Juan Pérez',
        role: 'client'
    },
    {
        id: 'user-002',
        email: 'admin@bienek.cl',
        password: 'admin123',
        name: 'Admin Bienek',
        role: 'admin'
    },
    {
        id: 'user-003',
        email: 'maria@empresa.cl',
        password: '123456',
        name: 'María González',
        role: 'client'
    }
];
