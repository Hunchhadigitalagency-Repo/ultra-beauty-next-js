"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/common/header/section-header";
import ImageCarousel from "@/components/common/carousel/image-carousel";

interface DifferentiatorSectionProps {
  hasButton?: boolean;
}

const DifferentiatorSection = ({ hasButton = true }: DifferentiatorSectionProps) => {

  return (
    <section className="flex flex-col justify-between items-center">
      <h4 className="text-xl font-semibold text-foreground">
        What Makes Us Different?
      </h4>
      <SectionHeader
        title="Made for Total Comfort"
        description="Our products Stands out from the crowd because the products are built with the best materials and are designed to provide maximum comfort."
        className="items-center text-center max-w-xl"
      />

      <ImageCarousel />

      {
        hasButton && <Button
          onClick={() => { }}
          className="text-black  rounded-full w-[250px] h-11 uppercase"
        >
          Shop Now <ArrowRight className="w-4 h-4" />
        </Button>
      }
    </section>
  );
};

export default DifferentiatorSection;
