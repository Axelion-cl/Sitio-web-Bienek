import Image from "next/image";
import { ContactForm } from "@/components/contacto/ContactForm";
import { PageTitle } from "@/components/ui/PageTitle";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactoPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* 1. Encabezado */}
            <div className="container mx-auto px-4 pt-16 pb-12">
                <PageTitle className="mb-6">Contáctenos</PageTitle>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
                    Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos a la brevedad.
                </p>
            </div>

            <div className="container mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* 2. Columna Izquierda: Formulario (ocupa 7 columnas en desktop) */}
                    <div className="lg:col-span-7">
                        <ContactForm />
                    </div>

                    {/* 3. Columna Derecha: Información y Mapa (ocupa 5 columnas en desktop) */}
                    <div className="lg:col-span-5 flex flex-col gap-8">

                        {/* Info Cards */}
                        <div className="space-y-6">
                            {/* Contact Info Card */}
                            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                                    Información de Contacto
                                </h3>
                                <ul className="space-y-6">
                                    <li className="flex items-start gap-4">
                                        <div className="bg-primary/20 p-2.5 rounded-lg shrink-0 text-gray-800">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-bold text-gray-900 mb-1">Dirección</span>
                                            <span className="text-gray-600 leading-relaxed">Parque Industrial San Andrés,<br />Concepción, Chile.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="bg-primary/20 p-2.5 rounded-lg shrink-0 text-gray-800">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-bold text-gray-900 mb-1">Teléfono</span>
                                            <span className="text-gray-600">+56 41 - 2635500</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="bg-primary/20 p-2.5 rounded-lg shrink-0 text-gray-800">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-bold text-gray-900 mb-1">Ventas</span>
                                            <a href="mailto:ventas@bienek.cl" className="text-gray-600 hover:text-primary transition-colors">ventas@bienek.cl</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Horario Card */}
                            <div className="bg-gray-900 text-white rounded-xl p-6 shadow-lg">
                                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                                    Horarios de Atención
                                </h3>
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/10 p-2.5 rounded-lg shrink-0">
                                        <Clock className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <span className="block text-sm font-bold text-gray-300 mb-1">Lunes a Viernes</span>
                                        <span className="text-xl font-medium text-white">8:00 - 18:00 hrs</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. Mapa */}
                        <div className="relative w-full h-[300px] rounded-2xl overflow-hidden shadow-md border border-gray-200">
                            <Image
                                src="/assets/images/contacto/mapa.png"
                                alt="Ubicación Casa Matriz Bienek"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
