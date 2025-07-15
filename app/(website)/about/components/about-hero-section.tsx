"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const AboutHeroSection = () => {
  return (
    <section>
      <div className="relative w-full md:w-[90%] m-auto h-[50vh] sm:h-[calc(100vh-200px)] overflow-hidden">
        <Image
          src="https://img.freepik.com/free-photo/3d-rendering-minimalist-interior-with-copy-space_23-2150943518.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740"
          alt="Hero Image"
          fill
          priority
          className="object-center"
        />

        <div className="absolute top-4 right-4 sm:top-6 sm:right-16 z-10">
          <Button
            variant="default"
            className="text-black rounded-full px-6 sm:w-[293px] h-10 sm:h-11 uppercase text-sm sm:text-base"
          >
            SHOP NOW <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-16 p-3 sm:p-4 bg-[#FE8F01BD] z-10 max-w-[90%] sm:max-w-none">
          <h3 className="text-xl sm:text-4xl text-white font-bold leading-tight">
            Delivering comfortable stay for you!
          </h3>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
