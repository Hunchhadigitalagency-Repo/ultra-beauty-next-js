import Blogs from "./components/blogs/blogs";
import HeroSection from "./components/hero/hero-section";
import BeautyBanner from "./components/beauty-banner/page";
import OffersSection from "./components/offers/offers-section";
import CategorySection from "./components/category/category-section";
// import PromoVideoSection from "./components/promo-video/promo-video";
import TrendingSection from "./components/trending/trending-section";
import FeaturedSection from "./components/featured/featured-section";
import MermaidBanner from "./components/mermaid-banner/mermaid-banner";
import BrandsCard from "./components/brands-that-you-love/brands-section";
import BrandAdsBanner from "./components/brand-ads-banner/brand-ads-banner";
// import BeautyVideoSection from "./components/beauty-video/beauty-video-section";
import PromotionalCarousel from "@/components/common/carousel/promotional-carousel";
import FeaturedProductCategories from "./components/featured-categories/featured-categories";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-white space-y-4">
      <HeroSection />
      <CategorySection />
      <OffersSection />
      <BeautyBanner />
      <TrendingSection />
      <BrandAdsBanner />
      <FeaturedProductCategories />
      {/* <BeautyVideoSection /> */}
      <PromotionalCarousel />
      <FeaturedSection />
      <MermaidBanner />
      <BrandsCard />
      {/* <PromoVideoSection /> */}
      <Blogs />
    </main>
  );
}
