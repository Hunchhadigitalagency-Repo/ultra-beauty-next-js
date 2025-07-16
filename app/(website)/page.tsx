import RecommendationCarousel from "@/components/common/carousel/recommendation-carousel";
import FeaturedProducts from "./components/featured-products/featured-products-section";
import HeroSection from "./components/hero/hero-section";
import PromotionalCarousel from "@/components/common/carousel/promotional-carousel";
import FAQSection from "../../components/common/faq/faq-section";
import KnowYourProductSection from "./components/know-your-product/know-your-product-section";

import Blogs from "./components/blogs/blogs";


import DifferentiatorSection from "../../components/common/differentiator/differentiator-section";
import Companies from "./components/companies/Companies";
import Testimonials from "@/components/common/testimonials/testimonials";
import Beauty_Banner from "./beauty_Banner/page";
import CategorySection from "./components/category/category-section";
import BrandsCard from "./components/brands-that-you-love/brands-section";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-white space-y-4">
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <Beauty_Banner />
      <RecommendationCarousel />
      <PromotionalCarousel className="padding" />
      <Testimonials />
      <DifferentiatorSection />
      <KnowYourProductSection />
      <BrandsCard/>
      <FAQSection />
      <Companies />
      <Blogs />
    </main>
  );
}
