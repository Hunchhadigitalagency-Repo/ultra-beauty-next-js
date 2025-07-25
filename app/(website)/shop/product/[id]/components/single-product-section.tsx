"use client";
import React from "react";
import { Product } from "@/types/website";
// import { useParams } from "next/navigation";
import ProductImagesSection from "./product-images-section";
// import { useFetchProduct } from "@/hooks/use-fetch-product";
import RatingStars from "@/components/common/product/rating-stars";
import ProductDescriptionSection from "./product-description-section";
// import SectionHeader from "@/components/common/header/section-header";

const dummyProduct: Product = {
  id: 1,
  name: "Organic Aloe Vera Gel",
  price: "19.99",
  sku: "ALOE123",
  slug_name: "organic-aloe-vera-gel",
  detail_description: "A soothing and moisturizing organic aloe vera gel suitable for all skin types.",
  general_description: "Natural aloe vera gel for daily skincare and hydration.",
  discount_percentage: "10",
  is_flash_sale: true,
  flash_end_date: "2025-08-01T23:59:59Z",
  flash_sale_discount: "15",
  images: [
    {
      id: 1,
      file: "https://images.unsplash.com/photo-1671575192248-5d8e42f18a9c?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      file_type: "",
      is_primary: true,
      created_at: ""
    }

  ],
  inventory: {
    id: 1,
    name: ""
  },
  is_Featured: true,
  is_must_sold: false,
  is_new: true,
  is_published: true,
  is_tax_applicable: true,
  brand: "Nature's Essence",
  category: {
    id: 10,
    name: "Skincare"
  },
  subcategory: {
    id: 101,
    name: "Gels"
  },
  tutorial: {
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    steps: [
      "Clean your face",
      "Apply a small amount of aloe vera gel",
      "Massage gently until absorbed"
    ]
  },
  quantity: 1,
  package: {
    type: "Tube",
    size: "200ml"
  },
  youtube_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  created_at: "2025-07-01T10:00:00Z",
  updated_at: "2025-07-20T15:30:00Z",
  variants: [
    {
      id: 1,
      name: "100ml",
      price: "10.99",
      item_image: ""
    },

  ]
};

const SingleProductSection: React.FunctionComponent = () => {

  // const params = useParams();
  // const id = params?.id as string;
  const rating = 4.5;

  // const { data: product, loading } = useFetchProduct<Product>(`products/${id}`);
  // console.log(product)
  // if (loading || !product) {
  //   return <div className="padding">Loading...</div>;
  // }

  return (
    <section className="padding space-y-6">
      <div>
        <div className="flex justify-end pl-8 w-full  mb-4">
          <div className="flex justify-between w-1/2">
            <span className="font-poppins font-medium text-sm text-[#7A7A7A]">
              Ubiya Derma
            </span>
            <div className="flex ">
              <RatingStars rating={rating} />
              <span className="text-sm text-[#333333]">
                {rating}/5 Star Rating by 349 people
              </span>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <ProductImagesSection
            // images={product.images}
            images={dummyProduct.images}
            // description={product.detail_description}
            description={dummyProduct.general_description}
          />
          <ProductDescriptionSection
            product={dummyProduct}
          />
        </div>
      </div>
    </section>
  );
};

export default SingleProductSection;
