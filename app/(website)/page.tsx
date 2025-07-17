
import HeroSection from "./components/hero/hero-section";
import Companies from "./components/companies/Companies";
import OffersSection from "./components/offers/offers-section";
import FAQSection from "../../components/common/faq/faq-section";
import CategorySection from "./components/category/category-section";
import TrendingSection from "./components/trending/trending-section";
import Testimonials from "@/components/common/testimonials/testimonials";
import PromotionalCarousel from "@/components/common/carousel/promotional-carousel";
import KnowYourProductSection from "./components/know-your-product/know-your-product-section";
import DifferentiatorSection from "../../components/common/differentiator/differentiator-section";
import BrandsCard from "./components/brands-that-you-love/brands-section";
import BeautyBanner from "./beauty-banner/page";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-white space-y-4">
      <HeroSection />
      <CategorySection />
      <OffersSection />
      <BeautyBanner/>
      <TrendingSection />
      <PromotionalCarousel className="padding" />
      <Testimonials />
      <DifferentiatorSection />
      <KnowYourProductSection />
      <BrandsCard />
      <FAQSection />
      <Companies />
    </main>
  );
}
