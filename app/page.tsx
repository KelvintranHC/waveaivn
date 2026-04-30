import ClientEffects from "@/components/ClientEffects";
import Cursor from "@/components/sections/Cursor";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Build from "@/components/sections/Build";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Team from "@/components/sections/Team";
import Partner from "@/components/sections/Partner";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import News from "@/components/sections/News";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <div suppressHydrationWarning className="raw-html">
        <Cursor />
        <Header />
        <Hero />
        <Build />
        <Services />
        <Process />
        <Team />
        <Partner />
        <Testimonials />
        <FAQ />
        <News />
        <CTA />
        <Footer />
      </div>
      <ClientEffects />
    </>
  );
}

