
import SectionHeader from "@/components/common/header/section-header";
import React from "react";
import VarietyTabs from "./variety-tabs";
import LinkText from "@/components/common/header/link-text";



const VarietySection = () => {
 

  return (
    <section className="padding space-y-4">
      <div className="flex justify-between gap-4">
        <SectionHeader
          title="Our Variety"
          description="Choose from the variety of product category that we offer"
        />
        <LinkText title="Shop Now" href="/shop" />
      </div>

      <VarietyTabs />
     
    </section>
  );
};

export default VarietySection;
