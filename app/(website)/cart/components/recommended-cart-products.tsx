"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/common/cards/product-card";
import SectionHeader from "@/components/common/header/section-header";

const RecommendedCartProducts: React.FunctionComponent = () => {
  const products = [
    {
      id: 1,
      title: "Sleek Pregnancy Cushion",
      description: "Comfort Pillow / Premium Quality",
      imageSrc:
        "https://img.freepik.com/free-psd/view-sofa-interior-design-decor_23-2151772696.jpg",
    },
    {
      id: 2,
      title: "Minimal Cushion Covers",
      description: "Elegant Linen / Soft Touch",
      imageSrc:
        "https://img.freepik.com/free-photo/minimal-linen-cushion-covers-sofa_53876-123961.jpg",
    },
  ];

  return (
    <section className="flex flex-col md:flex-col padding space-y-6">
      {/* Header centered */}
      <div className="text-center space-y-4">
        <h4 className="text-xl text-custom-black font-semibold">
          The Comfort that is different
        </h4>

        <SectionHeader
          title="Recommended Products"
          description="Some of the products that fit your needs. Order today and get comfort in your life"
          className="text-center"
        />

        <div className="flex justify-center">
          <Button
            variant="default"
            className="text-black rounded-full w-fit h-11 uppercase"
          >
            Shop Now <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Mobile layout: horizontal scroll */}
      <div className="sm:hidden flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[85%] max-w-[85%] flex-shrink-0"
          >
            <ProductCard
              id={product.id}
              title={product.title}
              description={product.description}
              imageSrc={product.imageSrc}
              alt="Product Image"
              rating={4.5}
              onAddToCart={() => { }}
              onToggleWishlist={() => { }}
              price="Nrs. 2000"
            />
          </div>
        ))}
      </div>

      {/* Desktop layout: larger ProductCards */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="w-full">
            <ProductCard
              id={product.id}
              title={product.title}
              description={product.description}
              imageSrc={product.imageSrc}
              alt="Product Image"
              rating={4.5}
              onAddToCart={() => { }}
              onToggleWishlist={() => { }}
              price="Nrs. 2000"
            />
          </div>
        ))}
      </div>
    </section>

  );
};

export default RecommendedCartProducts;
