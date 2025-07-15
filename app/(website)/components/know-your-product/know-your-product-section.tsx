import SectionHeader from "@/components/common/header/section-header";

import React from "react";
import KnowYourProductTabs from "./know-your-product-tabs";
import LinkText from "@/components/common/header/link-text";

const KnowYourProductSection = () => {
  return (
    <section className="padding space-y-4">
      <div className="flex items-center justify-between gap-4">
        <SectionHeader
          title="Know Your Product Better"
          description="Get the detail overview of the products"
        />

        <LinkText title="Shop Now" href="/shop" />
      </div>

      <KnowYourProductTabs />
    </section>
  );
};

export default KnowYourProductSection;
