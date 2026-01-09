import { solutions } from "@/data/solutions";
import { SectorHero } from "@/components/soluciones/SectorHero";
import { ProductGrid } from "@/components/soluciones/ProductGrid";
import { products } from "@/data/mockProducts";
import { notFound } from "next/navigation";

// Generate static params for all solution slugs
export async function generateStaticParams() {
    return solutions.map((solution) => ({
        slug: solution.slug,
    }));
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function SolucionesPage({ params }: PageProps) {
    const { slug } = await params;
    const solution = solutions.find((s) => s.slug === slug);

    if (!solution) {
        notFound();
    }

    return (
        <main>
            <SectorHero title={solution.title} image={solution.image} />
            <ProductGrid products={products} />
        </main>
    );
}
