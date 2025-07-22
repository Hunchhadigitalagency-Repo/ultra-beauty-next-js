import React from "react";
import AboutHeroSection from "./components/about-hero-section";
import AboutStats from "./components/about-stats";
import OurStory from "./components/our-story";
import OurVisions from "./components/our-visions";
import OurTeam from "./components/our-team";
import OurValues from "./components/our-values";
import OurGoals from "./components/our-goals";
import UltraBeauty from "./components/ultra-beauty";
import BusinessBenifits from "./components/business-benifits";
import BrandsSection from "../components/brands-that-you-love/brands-section";
import ClientTrust from "./components/client-trust";


const AboutPage = () => {
  return (
    <main className="space-y-8">
      <AboutHeroSection />
      <BrandsSection/>
      <UltraBeauty/>
      <ClientTrust/>
       <BusinessBenifits/>
      <OurStory />
     
      <OurVisions />
      <OurTeam />
      <AboutStats />
      <OurValues />
      <OurGoals />
    </main>
  );
};

export default AboutPage;
