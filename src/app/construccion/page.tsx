"use client";

import Image from "next/image";
import { Construction, Clock, Mail, Phone } from "lucide-react";

export default function ConstructionPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {/* Background elements - No gradients, just solid subtle shapes if any, or clean white */}
            <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-[#ecec00]/5 rounded-full pointer-events-none" />

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none select-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />

            <div className="z-10 max-w-2xl w-full text-center space-y-12 transition-all duration-1000 animate-in fade-in slide-in-from-bottom-8">
                {/* Logo Section */}
                <div className="flex flex-col items-center space-y-2">
                    <div className="relative w-56 h-20 md:w-72 md:h-24">
                        <Image
                            src="/assets/images/logo.svg"
                            alt="Bienek Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden">
                    {/* Solid Accent Bar */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-[#ecec00]" />

                    <div className="inline-flex items-center justify-center p-4 bg-[#ecec00]/10 rounded-2xl mb-8">
                        <Construction className="w-12 h-12 text-[#ecec00]" style={{ color: '#ecec00' }} />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-black mb-6 tracking-tight leading-none">
                        Sitio en <br className="md:hidden" />
                        <span style={{ color: '#ecec00' }}>construcción</span>
                    </h1>

                    <p className="text-gray-600 text-lg md:text-xl max-w-md mx-auto leading-relaxed mb-10 font-medium">
                        Estamos renovando nuestra plataforma para ofrecerte la mejor experiencia Bienek.
                    </p>

                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-sm font-bold mb-12">
                        <Clock className="w-4 h-4" style={{ color: '#ecec00' }} />
                        <span>PRÓXIMO LANZAMIENTO 2026</span>
                    </div>

                    {/* Contact Methods */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-left">
                        <a href="mailto:clientes@bienek.cl"
                            className="flex flex-col p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Escríbenos</span>
                            <span className="text-sm font-bold text-black group-hover:text-[#ecec00] transition-colors">clientes@bienek.cl</span>
                        </a>

                        <a href="tel:+56412635500"
                            className="flex flex-col p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Llámanos</span>
                            <span className="text-sm font-bold text-black group-hover:text-[#ecec00] transition-colors">+56 41 - 2635500</span>
                        </a>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-400 text-xs pt-4">
                    <p>&copy; {new Date().getFullYear()} Bienek SpA. Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    );
}
