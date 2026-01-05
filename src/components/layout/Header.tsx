"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, Globe, Truck, Clock, Phone } from "lucide-react";

export function Header() {
    return (
        <header className="w-full flex flex-col">
            {/* 1. Utility Bar */}
            <div className="bg-black text-white py-2 hidden lg:block">
                <div className="container mx-auto px-4 flex justify-between items-center font-sans">
                    {/* Left: Language & Links */}
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 cursor-pointer group">
                            <Globe className="w-5 h-5 text-primary" />
                            <div className="flex flex-col leading-tight">
                                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Idioma</span>
                                <span className="text-sm font-medium group-hover:text-primary transition-colors flex items-center gap-1">
                                    Español <span className="text-[10px]">▼</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm font-medium text-gray-300">
                            <Link href="#" className="hover:text-primary transition-colors">Empresa</Link>
                            <Link href="#" className="hover:text-primary transition-colors">Bolsa de Trabajo</Link>
                        </div>
                    </div>

                    {/* Right: Info Items */}
                    <div className="flex items-center gap-8">
                        {/* Cobertura */}
                        <div className="flex items-center gap-3">
                            <Truck className="w-6 h-6 text-white" />
                            <div className="flex flex-col leading-none">
                                <span className="text-[11px] text-gray-400 mb-0.5">Cobertura:</span>
                                <span className="text-sm font-bold tracking-wide">RM - X Región.</span>
                            </div>
                        </div>

                        {/* Horario */}
                        <div className="flex items-center gap-3">
                            <Clock className="w-6 h-6 text-white" />
                            <div className="flex flex-col leading-none">
                                <span className="text-[11px] text-gray-400 mb-0.5">Horario de atención:</span>
                                <span className="text-sm font-bold tracking-wide">8:00 a 18:00 hrs</span>
                            </div>
                        </div>

                        {/* Contacto */}
                        <div className="flex items-center gap-3">
                            <Phone className="w-6 h-6 text-white" />
                            <div className="flex flex-col leading-none">
                                <a href="mailto:ventas@bienek.cl" className="text-[11px] text-gray-400 hover:text-primary transition-colors mb-0.5">
                                    ventas@bienek.cl
                                </a>
                                <span className="text-sm font-bold tracking-wide">+56 41 - 2635500</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Menu */}
            <div className="bg-white py-4 shadow-sm z-20 relative">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src="/assets/images/logo.svg"
                            alt="Bienek Logo"
                            width={180}
                            height={60}
                            className="h-12 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Nav Links (Desktop) */}
                    <nav className="hidden lg:flex items-center gap-8 font-sans font-medium text-sm">
                        <Link href="/" className="hover:text-primary transition-colors">INICIO</Link>
                        <Link href="#" className="hover:text-primary transition-colors">SOLUCIONES</Link>
                        <Link href="#" className="hover:text-primary transition-colors">CATÁLOGO</Link>
                        <Link href="#" className="hover:text-primary transition-colors">PROMOCIONES</Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-6">
                        <Link href="#" className="hidden lg:block text-sm font-medium hover:text-primary transition-colors">
                            Blog Técnico
                        </Link>

                        <div className="flex items-center gap-2 text-sm font-medium cursor-pointer hover:text-primary transition-colors group">
                            <Image src="/assets/icons/acceso-clientes.svg" alt="Login" width={20} height={20} className="group-hover:opacity-80" />
                            <span>Acceso Clientes</span>
                        </div>

                        <Button className="font-bold tracking-wide">
                            CONTÁCTENOS
                        </Button>
                    </div>
                </div>
            </div>

            {/* 3. Brand Description Bar */}
            <div className="bg-white border-t border-gray-100 py-6 hidden lg:block">
                <div className="container mx-auto px-4">
                    <p className="font-sans text-xl text-gray-800 tracking-wide">
                        Soluciones Integrales de Higiene Industrial
                    </p>
                </div>
            </div>

            {/* 4. Search Bar & Statement */}
            <div className="bg-black text-white py-3">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-4">

                    {/* Search Input */}
                    <div className="relative w-full lg:w-1/3">
                        <input
                            type="text"
                            placeholder="Encuentra lo que estás buscando..."
                            className="w-full bg-gray-100 text-black rounded-full py-2.5 pl-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 font-sans"
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                    </div>

                    {/* Statement & Seal */}
                    <div className="flex items-center gap-6">
                        <span className="font-sans font-medium text-lg hidden md:block tracking-wide">
                            Líderes en Distribución de productos de Higiene
                        </span>
                        <div className="relative h-12 w-32">
                            <Image
                                src="/assets/images/lema-bienek.png"
                                alt="Sello Bienek"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
}
