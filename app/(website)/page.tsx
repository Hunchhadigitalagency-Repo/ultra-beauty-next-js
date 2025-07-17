
import HeroSection from "./components/hero/hero-section";
import OffersSection from "./components/offers/offers-section";
import CategorySection from "./components/category/category-section";
import TrendingSection from "./components/trending/trending-section";
import BrandsCard from "./components/brands-that-you-love/brands-section";
import PromotionalCarousel from "@/components/common/carousel/promotional-carousel";
import BrandAdsBanner from "./components/brand-ads-banner/brand-ads-banner";
import SkinCare from "./components/skin-care/skin-care";
import MakeUp from "./components/make-up/make-up";
import Featured from "./components/fetured/featured";
import Blogs from "./components/blogs/blogs";

import MermaidBanner from "./components/mermaid-banner/mermaid-banner";
import BeautyBanner from "./components/beauty-banner/page";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-white space-y-4">
      <HeroSection />
      <CategorySection />
      <OffersSection />
      <BeautyBanner />
      <TrendingSection />
      <BrandAdsBanner />
      <SkinCare />
      <MakeUp />
      <PromotionalCarousel className="padding" />
      <MermaidBanner />
      <Featured />
      <BrandsCard />
      <Blogs />
    </main>
  );
}
