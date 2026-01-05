import { cn } from "@/lib/utils";
import React from "react";

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> {
    children: React.ReactNode;
    className?: string;
}

export function Heading({ children, className, ...props }: TypographyProps) {
    return (
        <h2
            className={cn(
                "font-sans text-[2.5rem] leading-tight md:text-[55px] font-normal text-foreground", // 55px on desktop
                className
            )}
            {...props}
        >
            {children}
        </h2>
    );
}

export function Subheading({ children, className, ...props }: TypographyProps) {
    return (
        <h3
            className={cn(
                "font-sans text-xl leading-snug md:text-[29px] font-normal text-foreground", // 29px on desktop
                className
            )}
            {...props}
        >
            {children}
        </h3>
    );
}

export function Text({ children, className, ...props }: TypographyProps) {
    return (
        <p
            className={cn(
                "font-sans text-base text-gray-600 leading-relaxed",
                className
            )}
            {...props}
        >
            {children}
        </p>
    );
}
