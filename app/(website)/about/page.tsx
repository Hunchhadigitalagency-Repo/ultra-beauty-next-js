import React from "react";
import OurTeam from "./components/our-team";
import AboutStats from "./components/about-stats";
import UltraBeauty from "./components/ultra-beauty";
import ClientTrust from "./components/client-trust";
import AboutHeroSection from "./components/about-hero-section";
import BusinessBenifits from "./components/business-benifits";
import BrandsSection from "../components/brands-that-you-love/brands-section";


const AboutPage = () => {
  return (
    <main className="space-y-8">
      <AboutHeroSection />
      <BrandsSection />
      <UltraBeauty />
      <ClientTrust />
      <BusinessBenifits />
      <AboutStats />
      <OurTeam />
    </main>
  );
};

export default AboutPage;
