import Image from "next/image";
import { Search, Droplets } from "lucide-react";

export function ValueCards() {
    const cards = [
        {
            title: "Consultoría Especializada",
            description: "Enfoque en diagnóstico profesional para su empresa.",
            icon: <Search className="w-12 h-12 text-primary" />,
        },
        {
            title: "Soluciones de Higiene",
            description: "Representación de marcas líderes en el mercado.",
            icon: <Droplets className="w-12 h-12 text-primary" />,
        },
        {
            title: "Cobertura Logística",
            description: "Distribución eficiente desde la RM hasta la X Región.",
            icon: (
                <div className="relative w-12 h-12">
                    <Image
                        src="/assets/icons/camioncito.svg"
                        alt="Logistica"
                        fill
                        className="object-contain" // Simplified specifically for svg icon usage 
                    />
                </div>
            ),
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 border border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center gap-4"
                        >
                            <div className="p-4 bg-white rounded-full shadow-sm mb-2">
                                {card.icon}
                            </div>
                            <h3 className="font-sans font-bold text-xl text-gray-900">
                                {card.title}
                            </h3>
                            <p className="font-sans text-gray-600">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
