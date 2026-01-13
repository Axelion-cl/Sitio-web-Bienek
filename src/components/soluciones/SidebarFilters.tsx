"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

// Using native input styled with Tailwind since shadcn Checkbox is not installed.

interface SidebarFiltersProps {
    availableBrands: string[];
    selectedBrands: Set<string>;
    onToggleBrand: (brand: string) => void;
}

export function SidebarFilters({ availableBrands, selectedBrands, onToggleBrand }: SidebarFiltersProps) {
    const [isBrandsOpen, setIsBrandsOpen] = useState(true);

    return (
        <aside className="w-full lg:w-40 flex-shrink-0 space-y-6">
            <div className="pb-4 border-b border-gray-100">
                <h3 className="font-outfit font-semibold text-xl text-gray-900">Filtros</h3>
            </div>

            <div>
                <button
                    onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                    className="flex items-center justify-between w-full group mb-3"
                >
                    <h4 className="font-medium text-gray-900 text-sm uppercase tracking-wide">Marcas</h4>
                    {isBrandsOpen ? (
                        <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                    ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                    )}
                </button>

                <div
                    className={`space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${isBrandsOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    {availableBrands.map((brand) => {
                        const isChecked = selectedBrands.has(brand);
                        return (
                            <label
                                key={brand}
                                className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors -ml-2"
                            >
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        className="peer h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary/50 cursor-pointer"
                                        checked={isChecked}
                                        onChange={() => onToggleBrand(brand)}
                                    />
                                </div>
                                <span className={`text-sm ${isChecked ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                                    {brand}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
}
