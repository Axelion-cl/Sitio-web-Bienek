"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const brands = [
    { name: "3M", src: "/assets/images/logos/3M.webp", scale: 0.75 },
    { name: "Confort", src: "/assets/images/logos/Confort.webp", scale: 0.75 },
    { name: "Elite", src: "/assets/images/logos/Elite.webp", scale: 0.75 },
    { name: "Essity", src: "/assets/images/logos/Essity.webp" },
    { name: "Igenix", src: "/assets/images/logos/Igenix.webp" },
    { name: "Impeke", src: "/assets/images/logos/Impeke.webp" },
    { name: "Kimberly-Clark", src: "/assets/images/logos/Kimberly-Clark.webp" },
    { name: "Kleenex", src: "/assets/images/logos/Kleenex.webp" },
    { name: "SC Johnson", src: "/assets/images/logos/SC_Johnson_2018.webp" },
    { name: "Scott", src: "/assets/images/logos/Scott.webp" },
    { name: "Softys", src: "/assets/images/logos/Softys.webp" },
    { name: "Superior", src: "/assets/images/logos/Superior.webp" },
    { name: "Tork", src: "/assets/images/logos/Tork-Logo.webp" },
    { name: "Tremex", src: "/assets/images/logos/Tremex.webp" },
    { name: "Virginia", src: "/assets/images/logos/Virginia.webp" },
    { name: "Virutex Pro", src: "/assets/images/logos/Virutex Pro.webp", scale: 1.15, marginLeft: -20 },
    { name: "Wypall", src: "/assets/images/logos/Wypall.webp" },
    { name: "Diversey", src: "/assets/images/logos/logo-diversey-1536x1087-NUEVO.webp" },
    { name: "Taski", src: "/assets/images/logos/newTASKI-RGB-01-2.webp" },
];

export function BrandCarousel() {
    const { t } = useLanguage();

    return (

        <section className="pt-8 pb-16 bg-gray-50 border-t border-gray-100 overflow-hidden relative">
            <div className="container mx-auto px-4 mb-6 text-center relative z-10">
                <h2 className="font-sans font-normal text-black text-[2.5rem] md:text-[55px] leading-tight mb-6">
                    {t.home.marcasDestacadas}
                </h2>
                <div className="mx-auto bg-[#ecec00]" style={{ width: '176px', height: '5px' }} />
            </div>

            <div className="relative w-full overflow-hidden mask-linear-fade h-40 flex items-center z-10">
                <div className="flex animate-scroll whitespace-nowrap w-max items-center h-full" style={{ gap: '128px' }}>
                    {/* Duplicate list for seamless loop */}
                    {[...brands, ...brands].map((brand, index) => (
                        <div
                            key={index}
                            className="relative h-30 w-60 opacity-100 hover:scale-110 cursor-pointer flex items-center justify-center shrink-0 transition-transform duration-300"
                            style={{
                                height: '120px',
                                width: '240px',
                                transform: brand.scale ? `scale(${brand.scale})` : undefined,
                                marginLeft: brand.marginLeft ? `${brand.marginLeft}px` : undefined
                            }}
                        >
                            <Image
                                src={brand.src}
                                alt={`${brand.name} Logo`}
                                fill
                                className="object-contain"
                                sizes="240px"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Curved Separator */}
            <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] rotate-180 z-20">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] fill-white">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>

            {/* Tailwind Custom Animation */}
            <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 80s linear infinite;
        }
        .mask-linear-fade {
             mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
             -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
        </section>
    );
}
