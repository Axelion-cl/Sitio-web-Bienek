import { cn } from "@/lib/utils";
import React from "react";

interface PageTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

/**
 * PageTitle - Componente reutilizable para títulos de página.
 * Usa el mismo estilo que "Nuestras Soluciones" en la página de Inicio:
 * - Fuente Outfit (55px en desktop, 2.5rem en mobile)
 * - Barra amarilla centrada debajo del texto (176px x 5px, rounded-full)
 */
export function PageTitle({ children, className, ...props }: PageTitleProps) {
    return (
        <div className={cn("text-center", className)} {...props}>
            <h1 className="font-sans text-[2.5rem] leading-tight md:text-[55px] font-normal text-foreground">
                {children}
            </h1>
            <div
                className="mx-auto mt-4 bg-primary rounded-full"
                style={{ width: '176px', height: '5px' }}
            />
        </div>
    );
}
