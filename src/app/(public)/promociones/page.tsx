import { getAllProducts } from '@/services/products';
import { PromoBanner } from "@/components/promociones/PromoBanner";
import { PromoGrid } from "@/components/promociones/PromoGrid";

// Banner configuration (static)
const promoBanner = {
    title: 'Nueva Línea Profesional',
    description: 'Descubre nuestra exclusiva colección de productos certificados para el sector hospitalario. Mayor eficacia, mayor seguridad.',
    image: '/assets/images/blog-placeholder.png',
    backgroundColor: '#1a365d',
    buttonText: 'Conocer Más',
    buttonLink: '/soluciones/salud',
    orientation: 'right' as const
};

export default async function PromocionesPage() {
    // Fetch all products from Supabase
    const allProducts = await getAllProducts();

    // Filter by badges
    const enOfertaProducts = allProducts.filter(p =>
        p.badges.includes('En Promoción') || p.badges.includes('En Oferta')
    );

    const masVendidosProducts = allProducts.filter(p =>
        p.badges.includes('Más Vendidos')
    );

    return (
        <main className="min-h-screen bg-white pb-20">
            {/* Header Section */}
            <section className="bg-gray-50 py-16 md:py-24 mb-8 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-sans font-normal text-black text-[2.5rem] md:text-[55px] leading-tight mb-6">
                        Promociones
                    </h1>
                    <div className="mx-auto bg-[#ecec00] mb-6" style={{ width: '176px', height: '5px' }} />
                    <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
                        Nuestros productos en promoción
                    </p>
                </div>
            </section>

            {/* Dynamic Blocks */}
            <div className="container mx-auto px-4">
                {/* En Oferta Grid */}
                <PromoGrid title="En Oferta" products={enOfertaProducts} />

                {/* Banner */}
                <PromoBanner config={promoBanner} />

                {/* Más Vendidos Grid */}
                <PromoGrid title="Más Vendidos" products={masVendidosProducts} />
            </div>
        </main>
    );
}
