import Image from "next/image";

interface SectorHeroProps {
    title: string;
    image: string;
}

export function SectorHero({ title, image }: SectorHeroProps) {
    return (
        <section className="relative w-full overflow-hidden" style={{ height: '400px' }}>
            {/* Background Image */}
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                priority
            />

            {/* Text overlay box with black background and 50% opacity */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div
                    className="py-6 px-4 md:px-8 max-w-[95%] md:max-w-4xl rounded-xl text-center mx-auto bg-black/50"
                >
                    <h1
                        className="text-white font-normal font-outfit text-3xl md:text-5xl lg:text-[55px] leading-tight"
                    >
                        {title}
                    </h1>
                </div>
            </div>
        </section>
    );
}
