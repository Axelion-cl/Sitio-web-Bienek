"use client";

import Image from "next/image";

const brands = [
    { name: "3M", src: "/assets/images/logos/3M.png" },
    { name: "Confort", src: "/assets/images/logos/Confort.png" },
    { name: "Elite", src: "/assets/images/logos/Elite.png" },
    { name: "Essity", src: "/assets/images/logos/Essity.png" },
    { name: "Igenix", src: "/assets/images/logos/Igenix.png" },
    { name: "Impeke", src: "/assets/images/logos/Impeke.png" },
    { name: "Kimberly-Clark", src: "/assets/images/logos/Kimberly-Clark.png" },
    { name: "Kleenex", src: "/assets/images/logos/Kleenex.png" },
    { name: "Lysoform", src: "/assets/images/logos/Lysoform.png" },
    { name: "Raid", src: "/assets/images/logos/Raid.png" },
    { name: "SC Johnson", src: "/assets/images/logos/SC_Johnson_2018.png" },
    { name: "Scott", src: "/assets/images/logos/Scott.png" },
    { name: "Softys", src: "/assets/images/logos/Softys.png" },
    { name: "Superior", src: "/assets/images/logos/Superior.png" },
    { name: "Tork", src: "/assets/images/logos/Tork-Logo.png" },
    { name: "Tremex", src: "/assets/images/logos/Tremex.png" },
    { name: "Virginia", src: "/assets/images/logos/Virginia.png" },
    { name: "Virutex Pro", src: "/assets/images/logos/Virutex Pro.png" },
    { name: "Wypall", src: "/assets/images/logos/Wypall.png" },
    { name: "Diversey", src: "/assets/images/logos/logo-diversey-1536x1087-NUEVO.png" },
    { name: "Taski", src: "/assets/images/logos/newTASKI-RGB-01-2.png" },
];

export function BrandCarousel() {
    return (
        <section className="py-8 bg-gray-50 border-y border-gray-100 overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
                <h3 className="text-gray-400 font-sans font-medium uppercase tracking-widest text-sm">
                    Nuestros Aliados Estratégicos
                </h3>
            </div>

            <div className="relative w-full overflow-hidden mask-linear-fade">
                <div className="flex animate-scroll whitespace-nowrap w-max gap-16 items-center">
                    {/* Duplicate list for seamless loop */}
                    {[...brands, ...brands].map((brand, index) => (
                        <div
                            key={index}
                            className="relative h-16 w-32 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 transform hover:scale-110 cursor-pointer flex items-center justify-center"
                        >
                            <Image
                                src={brand.src}
                                alt={`${brand.name} Logo`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100px, 150px"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Tailwind Custom Animation */}
            <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .mask-linear-fade {
             mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
        </section>
    );
}
