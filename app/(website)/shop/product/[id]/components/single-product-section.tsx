"use client";

import SectionHeader from "@/components/common/header/section-header";
import ProductImagesSection from "./product-images-section";
import ProductDescriptionSection from "./product-description-section";
import { useParams } from "next/navigation";
import { useFetchProduct } from "@/hooks/use-fetch-product";
import { Product } from "@/types/website";

const SingleProductSection = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data: product, loading } = useFetchProduct<Product>(`products/${id}`);
  console.log(product)
  if (loading || !product) {
    return <div className="padding">Loading...</div>;
  }

  return (
    <section className="padding space-y-6">
      <SectionHeader
        title={product.name}
        description="Get list of the items here so you can buy"
        titleClassName="line-clamp-1 text-ellipsis"
      />

      <div className="grid lg:grid-cols-2 gap-8">
        <ProductImagesSection
          images={product.images}
          description={product.detail_description}
        />
        <ProductDescriptionSection product={product} />
      </div>
    </section>
  );
};

export default SingleProductSection;
