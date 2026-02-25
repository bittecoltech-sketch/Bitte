
import Hero from "@/components/sections/Hero";
import TechShowcase from "@/components/sections/TechShowcase";
import PlatformPreview from "@/components/sections/PlatformPreview";
import ServicesGrid from "@/components/sections/ServicesGrid";
import InnovationStats from "@/components/sections/InnovationStats";
import DemoHub from "@/components/sections/DemoHub";
import { BitteTech } from "@/components/sections/AdditionalSections";

export default function Home() {
  return (
    <>
      <Hero />
      <TechShowcase />
      <PlatformPreview />
      <ServicesGrid />
      <InnovationStats />
      <DemoHub />
      <BitteTech />
    </>
  );
}
