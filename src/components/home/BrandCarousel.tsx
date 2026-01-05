"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const brands = [
    "SC Johnson",
    "Softys",
    "Diversey",
    "Virutex",
    "Essity",
    "3M",
    "Tork",
    "Elite",
    "Sapolio"
];

export function BrandCarousel() {
    return (
        <section className="py-12 bg-gray-50 border-y border-gray-100 overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
                <h3 className="text-gray-400 font-sans font-medium uppercase tracking-widest text-sm">
                    Nuestros Aliados Estratégicos
                </h3>
            </div>

            <div className="relative w-full overflow-hidden mask-linear-fade">
                <div className="flex animate-scroll whitespace-nowrap w-max gap-16 items-center">
                    {/* Duplicate list for seamless loop */}
                    {[...brands, ...brands, ...brands].map((brand, index) => (
                        <div
                            key={index}
                            className="text-2xl font-bold font-sans text-gray-300 select-none hover:text-gray-400 transition-colors"
                        >
                            {brand}
                        </div>
                    ))}
                </div>
            </div>

            {/* Tailwind Custom Animation (Inline for now, ideally in globals.css) */}
            <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .mask-linear-fade {
             mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
        </section>
    );
}
