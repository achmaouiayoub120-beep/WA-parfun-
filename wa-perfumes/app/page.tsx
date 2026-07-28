'use client';

import { Preloader } from '@/components/ui/Preloader';
import { HeroSection } from '@/components/hero/HeroSection';
import { ScrollStorytelling } from '@/components/sections/ScrollStorytelling';
import { CollectionShowcase } from '@/components/sections/CollectionShowcase';
import { MenCollection } from '@/components/sections/MenCollection';
import { WomenCollection } from '@/components/sections/WomenCollection';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="relative flex flex-col bg-[#050505]">
      <Preloader />
      <HeroSection />
      <ScrollStorytelling />
      <CollectionShowcase />
      <MenCollection />
      <WomenCollection />
      <Footer />
    </main>
  );
}
