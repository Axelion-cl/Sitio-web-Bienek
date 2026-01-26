import Image from "next/image";

export function ValueCards() {
    const cards = [
        {
            title: "Consultoría Especializada",
            description: "Enfoque en diagnóstico profesional para su empresa.",
            image: "/assets/images/value-cards/consultoria.jpg",
        },
        {
            title: "Cobertura Logística",
            description: "Distribución eficiente desde la RM hasta la X Región.",
            image: "/assets/images/value-cards/logistica.png",
        },
        {
            title: "Soluciones de Higiene",
            description: "Representación de marcas líderes en el mercado.",
            image: "/assets/images/value-cards/higiene.jpg",
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="relative h-[264px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
                        >
                            {/* Background Image */}
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                <h3 className="font-outfit font-bold text-2xl mb-3">
                                    {card.title}
                                </h3>
                                <p className="font-sans text-gray-100 text-base leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
