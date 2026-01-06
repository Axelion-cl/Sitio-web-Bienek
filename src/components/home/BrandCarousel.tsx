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
            <div className="container mx-auto px-4 mb-12 text-center relative z-10 text-[40px]">
                <h3 className="font-sans font-normal text-black flex flex-col items-center gap-4 text-[40px] leading-tight" style={{ fontSize: '40px', fontFamily: 'var(--font-outfit)' }}>
                    Marcas Destacadas
                    <span className="bg-[#ecec00] block" style={{ width: '176px', height: '5px' }} />
                </h3>
            </div>

            <div className="relative w-full overflow-hidden mask-linear-fade h-24 flex items-center">
                <div className="flex animate-scroll whitespace-nowrap w-max gap-16 items-center h-full">
                    {/* Duplicate list for seamless loop */}
                    {[...brands, ...brands].map((brand, index) => (
                        <div
                            key={index}
                            className="relative h-16 w-40 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 transform hover:scale-110 cursor-pointer flex items-center justify-center shrink-0"
                            style={{ height: '64px', width: '160px' }}
                        >
                            <Image
                                src={brand.src}
                                alt={`${brand.name} Logo`}
                                fill
                                className="object-contain"
                                sizes="160px"
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
          animation: scroll 40s linear infinite;
        }
        .mask-linear-fade {
             mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
             -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
        </section>
    );
}
