import { HeroSection } from "@/components/home/HeroSection";
import { ValueCards } from "@/components/home/ValueCards";
import { BrandCarousel } from "@/components/home/BrandCarousel";
import { SolutionsGrid } from "@/components/home/SolutionsGrid";
import { getAllSectors } from "@/services/sectors";

export default async function Home() {
  // Fetch sectors from Supabase
  const sectors = await getAllSectors();

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <ValueCards />
      <BrandCarousel />
      <SolutionsGrid sectors={sectors} />
    </main>
  );
}
