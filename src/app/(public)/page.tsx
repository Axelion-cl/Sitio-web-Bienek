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
    description: "Productos esenciales para la limpieza diaria.",
    image: "/assets/images/solutions/jardines.png",
    featuredFamilies: ["papeles", "jabones", "dispensadores"]
  },
  {
    id: "industrial",
    slug: "soluciones-especializadas-sector-industrial-y-almacenaje",
    title: "Soluciones Especializadas sector Industrial y Almacenaje",
    description: "Limpieza profunda para entornos exigentes.",
    image: "/assets/images/solutions/industria.png",
    featuredFamilies: ["desengrasantes", "epp"]
  },
  {
    id: "salud",
    slug: "soluciones-especializadas-sector-salud",
    title: "Soluciones Especializadas sector Salud",
    description: "Higiene crítica para clínicas y hospitales.",
    image: "/assets/images/solutions/salud.png",
    featuredFamilies: ["desinfectantes-hosp", "insumos-medicos"]
  },
  {
    id: "institucional",
    slug: "soluciones-especializadas-sector-institucional",
    title: "Soluciones Especializadas sector Institucional",
    description: "Limpieza para oficinas y edificios públicos.",
    image: "/assets/images/solutions/oficinas.png",
    featuredFamilies: ["papeles", "dispensadores"]
  },
  {
    id: "educacion",
    slug: "soluciones-especializadas-sector-educacion",
    title: "Soluciones Especializadas sector Educación",
    description: "Ambientes seguros para el aprendizaje.",
    image: "/assets/images/solutions/educacion.png",
    featuredFamilies: ["jabones", "papeles"]
  },
  {
    id: "adulto-mayor",
    slug: "soluciones-para-centros-adulto-mayor",
    title: "Soluciones para Centros Adulto Mayor",
    description: "Cuidado delicado para espacios residenciales.",
    image: "/assets/images/solutions/adulto-mayor.png",
    featuredFamilies: ["desinfectantes-hosp"]
  },
  {
    id: "horeca",
    slug: "soluciones-especializadas-sector-horeca",
    title: "Soluciones Especializadas sector HORECA",
    description: "Impecabilidad para Hoteles, Restaurantes y Catering.",
    image: "/assets/images/solutions/horeca.png",
    featuredFamilies: ["cafe", "vajilla"]
  },
  {
    id: "veterinario",
    slug: "soluciones-especializadas-sector-veterinario",
    title: "Soluciones Especializadas sector Veterinario",
    description: "Desinfección segura para clínicas veterinarias.",
    image: "/assets/images/solutions/veterinaria.png",
    featuredFamilies: []
  },
  {
    id: "accesorios",
    slug: "equipamiento-accesorios",
    title: "Equipamiento Accesorios",
    description: "Herramientas manuales de alto rendimiento.",
    image: "/assets/images/solutions/limpieza-general.png",
    featuredFamilies: []
  },
  {
    id: "maquinaria",
    slug: "equipamientos-de-maquinaria",
    title: "Equipamientos de Maquinaria",
    description: "Tecnología para grandes superficies.",
    image: "/assets/images/solutions/maquinaria.png",
    featuredFamilies: []
  },
  {
    id: "aguas",
    slug: "tratamiento-de-agua",
    title: "Tratamiento de Aguas",
    description: "Soluciones químicas para calidad del agua.",
    image: "/assets/images/solutions/aguas.png",
    featuredFamilies: []
  },
  {
    id: "embarcaciones",
    slug: "soluciones-para-embarcaciones",
    title: "Soluciones para Embarcaciones",
    description: "Limpieza especializada marítima.",
    image: "/assets/images/solutions/embarcaciones.png",
    featuredFamilies: []
  },
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
