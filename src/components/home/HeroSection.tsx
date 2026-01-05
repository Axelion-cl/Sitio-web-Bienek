import Image from "next/image";
import { Heading, Subheading } from "@/components/ui/typography";

export function HeroSection() {
    return (
        <section className="relative w-full h-[600px] flex items-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/images/home/hero.png"
                    alt="Bienek Hero Background"
                    fill
                    className="object-cover brightness-75"
                    priority
                />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 container mx-auto px-4 text-white">
                <div className="max-w-3xl space-y-4">
                    <Heading className="text-white drop-shadow-md">
                        Soluciones Integrales de Limpieza
                    </Heading>
                    <Subheading className="text-gray-100 drop-shadow-md">
                        Líderes en Distribución de productos de Higiene
                    </Subheading>
                </div>
            </div>
        </section>
    );
}
