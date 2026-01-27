'use client';

import Image from "next/image";
import { PageTitle } from "@/components/ui/PageTitle";
import { useLanguage } from "@/context/LanguageContext";

export default function EmpresaPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-white">
            {/* 1. Encabezado de Identidad */}
            <div className="container mx-auto px-4 py-16">
                <PageTitle>{t.empresa.titulo}</PageTitle>
            </div>

            {/* 2. Bloque 1: Compromiso y Trayectoria (Imagen Izq - Texto Der) */}
            <section className="py-12 md:py-20 border-b border-gray-100">
                <div className="container mx-auto px-8 lg:px-24">
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
                        {/* Imagen */}
                        <div className="w-full md:w-5/12 relative rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/assets/images/empresa/trayectoria_v3.jpg"
                                alt="Equipo de logística Bienek en almacén"
                                width={1000}
                                height={950}
                                className="w-full h-auto hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Texto */}
                        <div className="w-full md:w-7/12 space-y-6">
                            <h2 className="text-3xl md:text-4xl leading-tight font-normal text-gray-900">
                                {t.empresa.trayectoria.titulo}
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {t.empresa.trayectoria.descripcion}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Bloque 2: Nuestra Visión (Texto Izq - Imagen Der) */}
            <section className="py-12 md:py-20 border-b border-gray-100">
                <div className="container mx-auto px-8 lg:px-24">
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-16">
                        {/* Imagen */}
                        <div className="w-full md:w-5/12 relative rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/assets/images/empresa/vision_v3.png"
                                alt="Visión de higiene profesional y soluciones integrales"
                                width={1000}
                                height={582}
                                className="w-full h-auto hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Texto */}
                        <div className="w-full md:w-7/12 space-y-6">
                            <h2 className="text-3xl md:text-4xl leading-tight font-normal text-gray-900">
                                {t.empresa.vision.titulo}
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {t.empresa.vision.desc1}
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {t.empresa.vision.desc2}
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {t.empresa.vision.desc3}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Bloque 3: Nuestra Misión (Imagen Izq - Texto Der) */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-8 lg:px-24">
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
                        {/* Imagen */}
                        <div className="w-full md:w-5/12 relative flex items-center justify-center p-4">
                            <Image
                                src="/assets/images/empresa/mision_v3.png"
                                alt="Nuestra Misión Bienek"
                                width={1000}
                                height={1000}
                                className="w-full h-auto hover:scale-105 transition-transform duration-700 drop-shadow-xl"
                            />
                        </div>

                        {/* Texto */}
                        <div className="w-full md:w-7/12 space-y-6">
                            <h2 className="text-3xl md:text-4xl leading-tight font-normal text-gray-900">
                                {t.empresa.mision.titulo}
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {t.empresa.mision.desc1}
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {t.empresa.mision.desc2}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main >
    );
}
