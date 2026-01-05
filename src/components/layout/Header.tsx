"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, User } from "lucide-react";

export function Header() {
    return (
        <header className="w-full flex flex-col">
            {/* 1. Utility Bar */}
            <div className="bg-white border-b border-gray-100 py-1 hidden lg:block">
                <div className="container mx-auto px-4 flex justify-between items-center text-xs text-gray-600 font-sans">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 cursor-pointer hover:text-black">
                            <span>ES</span>
                            <span>/</span>
                            <span className="text-gray-400 hover:text-black">EN</span>
                        </div>
                        <Link href="#" className="hover:text-black hover:underline">Empresa</Link>
                        <Link href="#" className="hover:text-black hover:underline">Bolsa de Trabajo</Link>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Image src="/assets/icons/ubicacion.svg" alt="Location" width={12} height={12} />
                            <span>Cobertura: RM a X Región</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image src="/assets/icons/reloj.svg" alt="Schedule" width={12} height={12} />
                            <span>8:00 a 18:00 hrs</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image src="/assets/icons/correo.svg" alt="Email" width={12} height={12} />
                            <a href="mailto:ventas@bienek.cl" className="hover:text-black hover:underline">ventas@bienek.cl</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Menu */}
            <div className="bg-white py-4 shadow-sm z-20 relative">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="text-3xl font-bold font-sans tracking-tight">
                        Bienek
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
