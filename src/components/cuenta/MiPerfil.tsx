'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Pencil, Lock, Check, X } from 'lucide-react';

import { useLanguage } from '@/context/LanguageContext';

export function MiPerfil() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        nombre: user?.name || '',
        email: user?.email || '',
        empresa: 'Nombre de tu empresa',
        telefono: '+56 9 91234567'
    });

    const handleSave = () => {
        // Mock save - would call API in real implementation
        setIsEditing(false);
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock password change
        setShowPasswordForm(false);
        alert('Contraseña actualizada correctamente (mock)');
    };

    return (
        <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-100 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900">{t.miCuenta.informacionPersonal}</h3>
                        <p className="text-sm text-gray-500">
                            {t.miCuenta.actualizaInfo}
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">{t.miCuenta.nombre}</label>
                        <input
                            type="text"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            disabled={!isEditing}
                            className="w-full bg-gray-200 rounded-lg px-4 py-2 text-gray-700 disabled:opacity-70"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">{t.miCuenta.correoElectronico}</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={!isEditing}
                            className="w-full bg-gray-200 rounded-lg px-4 py-2 text-gray-700 disabled:opacity-70"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">{t.miCuenta.empresaLabel}</label>
                        <input
                            type="text"
                            value={formData.empresa}
                            onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                            disabled={!isEditing}
                            className="w-full bg-gray-200 rounded-lg px-4 py-2 text-gray-700 disabled:opacity-70"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">{t.miCuenta.telefono}</label>
                        <input
                            type="tel"
                            value={formData.telefono}
                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                            disabled={!isEditing}
                            className="w-full bg-gray-200 rounded-lg px-4 py-2 text-gray-700 disabled:opacity-70"
                        />
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                    {isEditing ? (
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                <Check className="w-4 h-4" /> {t.miCuenta.guardarCambios}
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="flex items-center gap-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                                <X className="w-4 h-4" /> {t.miCuenta.cancelar}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            <Pencil className="w-4 h-4" /> {t.miCuenta.editarInfo}
                        </button>
                    )}
                </div>
            </div>

            {/* Password Section */}
            <div className="bg-gray-100 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-lg text-gray-900">{t.miCuenta.cambiarContrasena}</h3>
                </div>

                {showPasswordForm ? (
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">{t.miCuenta.contrasenaActual}</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-gray-200 rounded-lg px-4 py-2 text-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">{t.miCuenta.nuevaContrasena}</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-gray-200 rounded-lg px-4 py-2 text-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">{t.miCuenta.confirmarContrasena}</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-gray-200 rounded-lg px-4 py-2 text-gray-700"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="bg-primary text-black px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                {t.miCuenta.actualizarContrasena}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowPasswordForm(false)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                                {t.miCuenta.cancelar}
                            </button>
                        </div>
                    </form>
                ) : (
                    <button
                        onClick={() => setShowPasswordForm(true)}
                        className="text-primary hover:underline text-sm"
                    >
                        {t.miCuenta.cambiarMiContrasena}
                    </button>
                )}
            </div>
        </div>
    );
}
