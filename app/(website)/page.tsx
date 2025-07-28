
import Blogs from "./components/blogs/blogs";
import MakeUp from "./components/make-up/make-up";
import Featured from "./components/fetured/featured";
import SkinCare from "./components/skin-care/skin-care";
import HeroSection from "./components/hero/hero-section";
import BeautyBanner from "./components/beauty-banner/page";
import OffersSection from "./components/offers/offers-section";
import CategorySection from "./components/category/category-section";
import PromoVideoSection from "./components/promo-video/promo-video";
import TrendingSection from "./components/trending/trending-section";
import MermaidBanner from "./components/mermaid-banner/mermaid-banner";
import BrandsCard from "./components/brands-that-you-love/brands-section";
import BrandAdsBanner from "./components/brand-ads-banner/brand-ads-banner";
import GlowKitSection from "./components/featured-glow-kit/glow-kit-section";
import PromotionalCarousel from "@/components/common/carousel/promotional-carousel";
import BeautyVideoSection from "./components/beauty-video/beauty-video-section";



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
      <BeautyVideoSection />
      <MakeUp />
      <PromotionalCarousel className="padding" />
      <GlowKitSection />
      <MermaidBanner />
      <Featured />
      <BrandsCard />
      <PromoVideoSection />
      <Blogs />
     
    </main>
  );
}
