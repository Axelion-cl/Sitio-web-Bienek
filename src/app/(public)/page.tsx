import { HeroSection } from "@/components/home/HeroSection";
import { ValueCards } from "@/components/home/ValueCards";
import { BrandCarousel } from "@/components/home/BrandCarousel";
import { SolutionsGrid } from "@/components/home/SolutionsGrid";
// Import static data directly for Lite version
import { families } from "@/data/families";

// Mock sectors data sufficient for the SolutionsGrid based on Lite requirements
const staticSectors = [
  {
    id: "higiene",
    slug: "soluciones-generales-de-higiene",
    title: "Soluciones Generales de Higiene",
    description: "Equipamiento y suministros para la higiene profesional",
    image: "/assets/images/sectores/higiene.png", // Ensure these paths exist or use placeholders
    featuredFamilies: ["papeles", "jabones"] // IDs from families.ts
  },
  {
    id: "industrial",
    slug: "soluciones-industriales",
    title: "Soluciones Industriales",
    description: "Productos especializados para la industria",
    image: "/assets/images/sectores/industrial.png",
    featuredFamilies: ["quimicos", "seguridad"]
  },
  {
    id: "horeca",
    slug: "canal-horeca",
    title: "Canal Horeca",
    description: "Hoteles, Restaurantes y Catering",
    image: "/assets/images/sectores/horeca.png",
    featuredFamilies: []
  },
  {
    id: "salud",
    slug: "area-salud",
    title: "Área Salud",
    description: "Insumos clínicos y de limpieza",
    image: "/assets/images/sectores/salud.png",
    featuredFamilies: []
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <ValueCards />
      <BrandCarousel />
      <SolutionsGrid sectors={staticSectors as any} />
    </main>
  );
}
