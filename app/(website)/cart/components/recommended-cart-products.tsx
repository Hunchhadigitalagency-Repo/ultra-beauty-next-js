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
      brand: {
        id: 1,
        name: "The Comfort Zone",
      },
    },
    {
      id: 2,
      title: "Minimal Cushion Covers",
      description: "Elegant Linen / Soft Touch",
      imageSrc:
        "https://img.freepik.com/free-photo/minimal-linen-cushion-covers-sofa_53876-123961.jpg",
      brand: {
        id: 1,
        name: "The Comfort Zone",
      }
    },
  ];

  return (
    <section className="flex flex-col space-y-6 md:flex-col padding">
      {/* Header centered */}
      <div className="space-y-4 text-center">
        <h4 className="text-xl font-semibold text-custom-black">
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
            className="text-black uppercase rounded-full w-fit h-11"
          >
            Shop Now <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Mobile layout: horizontal scroll */}
      <div className="flex gap-4 pb-2 overflow-x-auto sm:hidden no-scrollbar">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[85%] max-w-[85%] flex-shrink-0"
          >
            <ProductCard
              // id={product.id}
              title={product.title}
              // brand={product.brand}
              // description={product.description}
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
      <div className="hidden grid-cols-2 gap-6 sm:grid lg:grid-cols-2 xl:grid-cols-2">
        {products.map((product) => (
          <div key={product.id} className="w-full">
            <ProductCard
              // id={product.id}
              // brand={product.brand}
              title={product.title}
              // description={product.description}
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
