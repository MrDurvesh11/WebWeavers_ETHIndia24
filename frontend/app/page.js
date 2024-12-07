"use client";

import SectionTitle from "@/components/sectionTitle";
import { TabsSection } from "@/components/TabsSection";
// import Hero from "@/components/hero";
// import HeroSection from "@/components/HeroSection";
import { AuroraBackgroundDemo } from "@/components/HeroSection";
import { NavbarDemo } from "@/components/Navbar";
import { FeaturesSectionDemo } from "@/components/Features";
import { benefitOne } from "@/components/data";
// import NavbarDemo from "@/components/acertinity/AcertinityNavbar";
import Video from "@/components/video";
import Benefits from "@/components/benefits";
import Footer from "@/components/footer";
import Faq from "@/components/faq";
import Cta from "@/components/cta";

export default function Home() {
  return (
    <div>
      <NavbarDemo />
      {/* <AcertinityNavbar/> */}
      {/* <NavbarDemo /> */}
      <AuroraBackgroundDemo />

      {/* <Hero/> */}

      {/* <Benefits data={benefitOne} />
       */}
      <FeaturesSectionDemo />
      <SectionTitle title=" How to use EquiChain" />
      <Video />

      <SectionTitle
        pretitle="Why should you use EquiChain"
        title="Our Features"
      ></SectionTitle>
      <TabsSection />

      <SectionTitle
        pretitle=""
        title="Frequently Asked Questions"
      ></SectionTitle>

      <Faq />

      <Footer />
    </div>
  );
}
