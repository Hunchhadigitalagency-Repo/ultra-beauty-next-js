"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DOMPurify from "dompurify";
import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type ProductImage = {
  id: number;
  file: string;
  file_type: string;
  is_primary: boolean;
  created_at: string;
};

interface ProductImagesSectionProps {
  images: ProductImage[];
  description: string;
  is_flash_sale?: boolean;
}

const methods =[
  {title: 'How To Use',
   desc:"Apply a small amount to cleansed face and neck every morning and night. Gently massage in upward circular motions until fully absorbed. For best results, use consistently after toner and serum."},
  {title: "Ingredients", 
  desc: "Apply a small amount to cleansed face and neck every morning and night. Gently massage in upward circular motions until fully absorbed. For best results, use consistently after toner and serum. Apply a small amount to cleansed face and neck every morning and night. Gently massage in upward circular motions until fully absorbed. For best results, use consistently after toner and serum."
  }
]


const ProductImagesSection: React.FC<ProductImagesSectionProps> = ({
  images,
  // is_flash_sale,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    images?.[0]?.file || ""
  );

  return (
    <div className="space-y-4">
      {/* Main Image (responsive height) */}
      <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] lg:h-[400px]">
        {selectedImage && (
          <Image
            src={selectedImage}
            alt="Main product"
            fill
            className="object-center object-cover rounded-lg"
          />
        )}
        <Badge className="absolute top-4 right-4 bg-[#4A90E2] text-white">
          New
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-white hover:bg-white/80 rounded-full"
        >
          <Heart className="size-5" />
        </Button>
      </div>

      {images?.length > 1 && (
        <div className="grid grid-cols-4 gap-1 md:gap-6 overflow-x-auto">
          {images.map((img) => (
            <div
              key={img.id}
              className="flex-shrink-0 w-[85px] sm:w-[80px] md:w-full relative h-[100px] sm:h-[120px] md:h-[150px]"
              onClick={() => setSelectedImage(img.file)}
            >
              <Image
                src={img.file}
                alt={`Product thumbnail ${img.id}`}
                fill
                className="rounded-lg border-2 border-transparent hover:border-primary cursor-pointer object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Flash Sale Badge */}
        <div className="flex justify-between text-white w-full bg-[#4A90E2] rounded-lg px-3 py-2 ">
          <span className="font-bold font-poppins"> Flash Sales</span>
          <span className="font-poppins">Ends in 48:00:00 Hrs</span>
          </div>
    
      {/* Detail Description */}
      <Accordion type="single" collapsible >
          {methods?.map((method) => (
            <AccordionItem
              key={method.title}
              value={`${method.title}`}
              className="rounded-lg  py-2 bg-white border-none"
            >
              <AccordionTrigger className="text-left px-4 font-poppins cursor-pointer bg-secondary text-foreground hover:text-primary hover:no-underline data-[state=open]:text-primary text-lg">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(method.title),
                  }}
                />
              </AccordionTrigger>
              <AccordionContent className="text-foreground text-sm font-poppins leading-relaxed pt-2 pb-4">
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(method.desc) }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
    </div>
  );
};

export default ProductImagesSection;
