import Image from "next/image";
import { PageTitle } from "@/components/ui/PageTitle";

export default function EmpresaPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* 1. Encabezado de Identidad */}
            <div className="container mx-auto px-4 py-16">
                <PageTitle>Sobre Nosotros</PageTitle>
            </div>

            {/* 2. Bloque 1: Compromiso y Trayectoria (Imagen Izq - Texto Der) */}
            <section className="py-12 md:py-20 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                        {/* Imagen */}
                        <div className="w-full md:w-1/2 relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/assets/images/empresa/trayectoria.png"
                                alt="Equipo de logística Bienek en almacén"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Texto */}
                        <div className="w-full md:w-1/2 space-y-6">
                            <h2 className="text-3xl md:text-4xl leading-tight font-bold text-gray-900">
                                Comprometidos con la excelencia en soluciones de higiene profesional.
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Somos una empresa chilena con más de 40 años de experiencia en el suministro y asesoría en higiene profesional. Nuestro propósito es garantizar la continuidad operativa de nuestros clientes a través de productos de primera línea, asesoría experta y un servicio logístico confiable.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Bloque 2: Nuestra Visión (Texto Izq - Imagen Der) */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
                        {/* Imagen */}
                        <div className="w-full md:w-1/2 relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/assets/images/empresa/vision.png"
                                alt="Visión de higiene profesional y soluciones integrales"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Texto */}
                        <div className="w-full md:w-1/2 space-y-6">
                            <h2 className="text-3xl md:text-4xl leading-tight font-bold text-gray-900">
                                Nuestra Visión
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Ser Empresa Líder en distribución de productos de Higiene profesional, comprometidos con una evolución constante en la excelencia del servicio.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Es enfocarnos en proveer servicios en tiempo y forma, capacitando a nuestros consumidores finales en los productos más eficaces del mercado.
                            </p>
                            <p className="text-lg text-gray-900 leading-relaxed font-medium">
                                Persistir en nuestro objetivo de brindar a nuestros valiosos clientes, verdaderas: &quot;Soluciones Integrales de Limpieza&quot; cumpliendo expectativas de manera de ser soporte y contribución al éxito de sus operaciones.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
