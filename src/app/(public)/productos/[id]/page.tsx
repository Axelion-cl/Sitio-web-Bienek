import { notFound } from "next/navigation";
import { getAllProducts, getProductById, getRelatedProducts } from "@/services/products";
import { ProductDetailView } from "@/components/products/ProductDetailView";
import { RelatedProducts } from "@/components/products/RelatedProducts";

// Generate static params for all products (Static Export)
// This will fetch ALL products from Supabase at BUILD TIME.
export async function generateStaticParams() {
    const products = await getAllProducts();

    if (!products || products.length === 0) return [];

    return products.map((product) => ({
        id: product.id,
    }));
}

export const dynamicParams = false; // Static Export requires known params or fallback handling
// export const revalidate = 60; // Has no effect in 'output: export' mode within Supabase context usually, but kept clean.

// Generate Metadata for SEO
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        return {
            title: 'Producto no encontrado | Bienek',
        };
    }

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${product.name} | Bienek`,
        description: product.description || `Detalles y especificaciones de ${product.name}`,
        openGraph: {
            title: product.name,
            description: product.description || undefined,
            images: product.images && product.images.length > 0
                ? [product.images[0], ...previousImages]
                : previousImages,
        },
    };
}

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    // Fetch related products
    const relatedProducts = await getRelatedProducts(product.relatedProducts);

    return (
        <main className="min-h-screen bg-white">

            {/* 1. Hero Content (Breadcrumb could go here) */}

            {/* Client-Side View Component for Live Updates */}
            <ProductDetailView initialProduct={product} />

            {/* 3. Description & Specs Container Removed (Now inside ProductDetailView) */}

            {/* 3. Description & Specs Container Removed */}


            {/* 4. Related Products */}
            <RelatedProducts products={relatedProducts} />
        </main>
    );
}
