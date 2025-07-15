import RecommendationCarousel from "@/components/common/carousel/recommendation-carousel";
import FeaturedProducts from "./components/featured-products/featured-products-section";
import HeroSection from "./components/hero/hero-section";
import VarietySection from "./components/variety/variety-section";
import PromotionalCarousel from "@/components/common/carousel/promotional-carousel";
import FAQSection from "../../components/common/faq/faq-section";
import KnowYourProductSection from "./components/know-your-product/know-your-product-section";

import Blogs from "./components/blogs/blogs";


import DifferentiatorSection from "../../components/common/differentiator/differentiator-section";
import Companies from "./components/companies/Companies";
import Testimonials from "@/components/common/testimonials/testimonials";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white space-y-4">
      <HeroSection />
      <VarietySection />
      <FeaturedProducts />
      <RecommendationCarousel />
      <PromotionalCarousel className="padding" />
      <Testimonials />
      <DifferentiatorSection />
      <KnowYourProductSection />
      <FAQSection />
      <Companies />
      <Blogs />
    </main>
  );
}
