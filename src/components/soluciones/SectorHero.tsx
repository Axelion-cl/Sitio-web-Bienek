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
                    className="py-6 rounded-xl text-center"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        paddingLeft: '50px',
                        paddingRight: '50px',
                    }}
                >
                    <h1
                        className="text-white font-normal"
                        style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: '55px',
                            lineHeight: '1.2',
                        }}
                    >
                        {title}
                    </h1>
                </div>
            </div>
        </section>
    );
}
