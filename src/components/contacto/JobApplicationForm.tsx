"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { FileUpload } from "@/components/contacto/FileUpload";
import { useLanguage } from "@/context/LanguageContext";
import { TurnstileWidget } from "@/components/ui/TurnstileWidget";


// Helper to send email via PHP Bridge
const sendEmail = async (formData: FormData) => {
    const PHP_BRIDGE_URL = process.env.NEXT_PUBLIC_PHP_BRIDGE_URL;
    if (!PHP_BRIDGE_URL) {
        console.warn("PHP_BRIDGE_URL variable not set");
        return false;
    }

    try {
        const response = await fetch(PHP_BRIDGE_URL, {
            method: "POST",
            body: formData, // Browser automatically sets Content-Type: multipart/form-data
        });
        return response.ok;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

const AREAS = [
    "Ventas",
    "Logística y Bodega",
    "Administración",
    "Operaciones",
    "Servicio al Cliente",
    "Prácticas Profesionales",
    "Otro"
];

interface JobApplicationData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    area: string;
    message: string;
    cv: File | null;
}

export function JobApplicationForm() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState<JobApplicationData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        area: "",
        message: "",
        cv: null
    });

    const [errors, setErrors] = useState<Partial<Record<keyof JobApplicationData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    const validate = () => {
        const newErrors: Partial<Record<keyof JobApplicationData, string>> = {};
        if (!formData.firstName.trim()) newErrors.firstName = t.forms.general.camposObligatorios;
        if (!formData.lastName.trim()) newErrors.lastName = t.forms.general.camposObligatorios;
        if (!formData.email.trim()) newErrors.email = t.forms.general.camposObligatorios;
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email inválido";
        if (!formData.phone.trim()) newErrors.phone = t.forms.general.camposObligatorios;
        if (!formData.area) newErrors.area = t.forms.general.camposObligatorios;
        if (!formData.cv) newErrors.cv = t.forms.general.camposObligatorios;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name as keyof JobApplicationData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);

        if (!validate()) return;

        if (!turnstileToken) {
            setSubmitError("Por favor verifica que no eres un robot.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Send Email via PHP Bridge
            const bridgeData = new FormData();
            bridgeData.append("name", `${formData.firstName} ${formData.lastName}`);
            bridgeData.append("email", formData.email);
            bridgeData.append("d3", formData.area); // Map 'area' to generic 'd3' field
            bridgeData.append("phone", formData.phone);
            bridgeData.append("message", formData.message);
            bridgeData.append("type", "application");
            bridgeData.append("cf-turnstile-response", turnstileToken);

            if (formData.cv) {
                bridgeData.append("attachment", formData.cv);
            }

            const emailSuccess = await sendEmail(bridgeData);

            if (emailSuccess) {
                setIsSuccess(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTurnstileToken(null);
            } else {
                setSubmitError(t.forms.general.error);
            }
        } catch (error) {
            setSubmitError(t.forms.general.error);
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center animate-in fade-in zoom-in duration-300 border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-outfit font-bold text-2xl md:text-3xl text-gray-900 mb-4">
                    {t.forms.general.exito}
                </h3>
                <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                    Hemos recibido tus antecedentes correctamente. Nuestro equipo de Recursos Humanos revisará tu perfil y te contactaremos si encajas con nuestras vacantes.
                </p>
                <button
                    onClick={() => {
                        setIsSuccess(false);
                        setFormData({ firstName: "", lastName: "", email: "", phone: "", area: "", message: "", cv: null });
                    }}
                    className="inline-block px-8 py-3 bg-[#ecec00] text-black font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                >
                    Enviar otra postulación
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100">
            <div className="mb-8 border-b border-gray-200 pb-6">
                <h2 className="font-outfit font-semibold text-2xl text-gray-900 mb-2">{t.forms.trabajo.titulo}</h2>
                <p className="text-gray-600">{t.forms.trabajo.subtitulo}</p>
            </div>

            {submitError && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                    {submitError}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Nombre */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">{t.forms.general.nombre} *</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#ecec00] transition-all
                            ${errors.firstName ? 'border-red-300 focus:border-red-300' : 'border-gray-200 focus:border-transparent'}
                        `}
                        placeholder="Ej: Juan"
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                </div>

                {/* Apellido */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">Apellidos *</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#ecec00] transition-all
                            ${errors.lastName ? 'border-red-300 focus:border-red-300' : 'border-gray-200 focus:border-transparent'}
                        `}
                        placeholder="Ej: Pérez"
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">{t.forms.general.email} *</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#ecec00] transition-all
                            ${errors.email ? 'border-red-300 focus:border-red-300' : 'border-gray-200 focus:border-transparent'}
                        `}
                        placeholder="juan.perez@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* Teléfono */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">{t.forms.general.telefono} *</label>
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#ecec00] transition-all
                            ${errors.phone ? 'border-red-300 focus:border-red-300' : 'border-gray-200 focus:border-transparent'}
                        `}
                        placeholder="+56 9 1234 5678"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>

                {/* Área */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="area">Área de Interés *</label>
                    <select
                        name="area"
                        id="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#ecec00] transition-all
                            ${errors.area ? 'border-red-300 focus:border-red-300' : 'border-gray-200 focus:border-transparent'}
                        `}
                    >
                        <option value="">Selecciona un área...</option>
                        {AREAS.map(area => (
                            <option key={area} value={area}>{area}</option>
                        ))}
                    </select>
                    {errors.area && <p className="mt-1 text-sm text-red-500">{errors.area}</p>}
                </div>
            </div>

            {/* Carta de Presentación */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">{t.forms.general.mensaje}</label>
                <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#ecec00] focus:border-transparent transition-all resize-none"
                    placeholder="Cuéntanos brevemente sobre ti y por qué te gustaría trabajar con nosotros..."
                />
            </div>

            {/* File Upload */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.forms.general.adjuntar} *</label>
                <FileUpload
                    onFileSelect={(file) => {
                        setFormData(prev => ({ ...prev, cv: file }));
                        if (file) setErrors(prev => ({ ...prev, cv: undefined }));
                    }}
                    error={errors.cv}
                />
            </div>


            {/* Turnstile */}
            <div className="mb-6">
                <TurnstileWidget onVerify={setTurnstileToken} />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg text-black flex items-center justify-center gap-2 transition-all
                    ${isSubmitting ? 'bg-gray-200 cursor-not-allowed text-gray-500' : 'bg-[#ecec00] hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]'}
                `}
            >
                {isSubmitting ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t.forms.general.enviando}
                    </span>
                ) : (
                    <>
                        <Send className="w-5 h-5" />
                        {t.forms.general.enviar}
                    </>
                )}
            </button>
        </form>
    );
}
