import Image from "next/image";


export function HeroSection() {
    return (
        <section className="relative w-full h-[500px] flex items-center" style={{ height: '500px' }}>
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/images/home/hero.webp"
                    alt="Bienek Hero Background"
                    fill
                    sizes="100vw"
                    className="object-cover brightness-75"
                    priority
                />
            </div>


        </section>
    );
}
