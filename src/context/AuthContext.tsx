'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockUsers, MockUser, UserRole } from '@/data/mockUsers';

// User type without password for security
export interface AuthUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}

interface AuthContextType {
    user: AuthUser | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_STORAGE_KEY = 'bienek_auth_user';

export function AuthProvider({ children, storageKey = DEFAULT_STORAGE_KEY }: { children: ReactNode; storageKey?: string }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem(storageKey);
            }
        }
        setIsLoading(false);
    }, [storageKey]);

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        // Find user in mock database
        const foundUser = mockUsers.find(
            (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (!foundUser) {
            return { success: false, error: 'Credenciales incorrectas' };
        }

        // Create auth user (without password)
        const authUser: AuthUser = {
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
            role: foundUser.role
        };

        // Store in state and localStorage
        setUser(authUser);
        localStorage.setItem(storageKey, JSON.stringify(authUser));

        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(storageKey);
    };

    // Don't render children until we've checked localStorage
    if (isLoading) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
