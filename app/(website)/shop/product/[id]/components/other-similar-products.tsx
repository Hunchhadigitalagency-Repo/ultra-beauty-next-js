"use client"
import ProductCard from "@/components/common/cards/product-card";
import LinkText from "@/components/common/header/link-text";
import SectionHeader from "@/components/common/header/section-header";
import React from "react";

const OtherSimilarProducts = () => {
  return (
    <section className="space-y-6 padding">
      <div className="flex items-center justify-between gap-4">
        <SectionHeader
          title="Other Similar Products"
          description="Products that people buy together"
        />

        <LinkText href="/" title="Go to Shop" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard
        id={1}
          title="Sleek Pregnancy Cushion with some random text abd long text"
          description="Pregnancy Care / Pillow/ Name of the Project will go here and it can be long but with some long text"
          imageSrc="https://img.freepik.com/free-photo/home-appliance-seat-interior-ergonomic-sign_1172-512.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740"
          alt="Black office chair"
          rating={4.5}
          price="$24,000"
          previousPrice="$23,000"
          discountTag="20% OFF"
    
          onAddToCart={() => console.log("Add to Cart")}
        />
      </div>
    </section>
  );
};

export default OtherSimilarProducts;
