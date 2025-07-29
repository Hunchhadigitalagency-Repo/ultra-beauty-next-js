"use client";
import React from "react";
import Link from "next/link";
import aboutheroimage from "@/assets/bg-hero.png";
import { FaArrowRightLong } from "react-icons/fa6";
import SectionHeader from "@/components/common/header/section-header";


const AboutHeroSection: React.FunctionComponent = () => {

  return (
    <section className="padding-y">
      <div className="relative h-90 md:h-120 overflow-visible ">
        <div
          className="text-white padding   flex justify-start items-center absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${aboutheroimage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className=" md:max-w-[30%] max-w-[50%] w-full  flex flex-col gap-5 items-start  my-8">
            <h1 className="font-playfair text-xl md:text-3xl">
              About Us
            </h1>
            <SectionHeader
              title="House Of Beauty Products"
              description="Treat yourself to luxury for less. Apply your promo code at checkout and enjoy exclusive discounts on our curated collections."
              titleClassName="text-white md:text-2xl xl:text-5xl font-playfair md:leading-14 text-3xl font-bold text-xl"
              descriptionClassName="text-white md:mt-5 mt-2 text-sm md:text-base"
            />
            <button className="bg-primary lg:px-6 lg:py-2 rounded-full flex items-center justify-center gap-2 border-white-300 text-sm px-2 py-2">
              <Link href="/shop">
                View New Collection
              </Link>
              <FaArrowRightLong />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;