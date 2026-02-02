"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-white border-t border-gray-100 py-10 mt-auto">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 font-sans">

                {/* 1. Logo Column - Aligned left */}
                <div className="flex flex-col justify-start">
                    <Link href="/" className="inline-block">
                        <Image
                            src="/assets/images/logo.svg"
                            alt="Bienek Logo"
                            width={180}
                            height={60}
                            className="h-12 w-auto object-contain"
                        />
                    </Link>
                </div>

                {/* 2. Casa Matriz */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-black">
                        <Image src="/assets/icons/casa-matriz.svg" alt="" width={24} height={24} />
                        <h3 className="font-sans font-semibold text-lg leading-6">{t.footer.casaMatriz}</h3>
                    </div>
                    <div className="space-y-1 text-black font-sans font-normal text-base leading-[28px]">
                        <p>Juan Sebastián Elcano 1910,</p>
                        <p>Parque Industrial San Andrés</p>
                        <p>Hualpén / Concepción / Chile</p>
                    </div>
                </div>

                {/* 3. Contacto */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-black">
                        <Image src="/assets/icons/telefono.svg" alt="" width={24} height={24} />
                        <h3 className="font-sans font-semibold text-lg leading-6">{t.footer.contacto}</h3>
                    </div>
                    <div className="space-y-1 text-black font-sans font-normal text-base leading-[28px]">
                        <p>{t.miCuenta.telefono} +56 41-2635500</p>
                        <div className="flex flex-col">
                            <p>{t.header.horario}</p>
                            <p>Lunes A Viernes De 8:00 A 18:00.</p>
                        </div>
                        <p>{t.miCuenta.correoElectronico} ventas@bienek.cl</p>
                    </div>
                </div>

                {/* 4. Información Útil */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-black">
                        <Image src="/assets/icons/informacion-util.svg" alt="" width={24} height={24} />
                        <h3 className="font-sans font-semibold text-lg leading-6">{t.footer.informacionUtil}</h3>
                    </div>
                    <nav className="flex flex-col gap-1 text-black font-sans font-normal text-base leading-7">
                        <Link href="/empresa" className="hover:text-primary transition-colors">{t.header.empresa}</Link>
                        <Link href="/trabaja-con-nosotros" className="hover:text-primary transition-colors">{t.footer.trabajaConNosotros}</Link>
                    </nav>
                </div>

            </div>

            {/* Copyright */}
            <div className="container mx-auto px-4 mt-8 pt-4 border-t border-gray-100 text-center text-xs text-gray-400 font-sans">
                {t.footer.derechos}
            </div>
        </footer>
    );
}
