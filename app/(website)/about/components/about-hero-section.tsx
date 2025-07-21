"use client";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import SectionHeader from "@/components/common/header/section-header";
import aboutheroimage from "@/assets/bg-hero.png";
// import { Button } from "@/components/ui/button";

const AboutHeroSection = () => {
  return (
    <div
      className="bg-cover bg-start text-white padding lg:min-h-96 flex justify-start items-center"
      style={{ backgroundImage: `url(${aboutheroimage.src})` }}
    >
      <div className="w-full md:w-1/3 flex flex-col gap-10 h-full justify-center items-center md:items-start">
      <div className="flex flex-col gap-0 items-center md:items-start">
         <h3 className="text-base sm:text-lg md:text-lg font-semibold font-playfair md:leading-2 ">
          About Us
        </h3>

        <SectionHeader
          title="House Of Beauty Products"
          description="Treat yourself to luxury for less. Apply your promo code at checkout and enjoy exclusive discounts on our curated collections."
          titleClassName="text-white font-playfair lg:text-4xl leading-snug text-center lg:text-left"
        />
      </div>
       

        <button className="bg-[#FF2B5F] rounded-full px-4 py-2 flex items-center gap-2 text-sm sm:text-base">
          View New Collection <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
};

export default AboutHeroSection;