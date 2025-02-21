import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { Benefits } from "@/components/home/benefits";
import { Testimonials } from "@/components/home/testimonials";
import { Cta } from "@/components/home/cta";
export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <Benefits />
      <Cta />
      <Testimonials />
    </div>
  );
} 