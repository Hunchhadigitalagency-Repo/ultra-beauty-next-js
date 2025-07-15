"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

const ProductImagesSection: React.FC<ProductImagesSectionProps> = ({
  images,
  description,
  is_flash_sale,
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
        <Badge className="absolute top-4 right-4 bg-gray-800 text-white">
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
      {is_flash_sale && (
        <Badge className="bg-red-500 text-white w-fit">Flash Sales</Badge>
      )}

      {/* Detail Description */}
      {description && (
        <div className="space-y-2">
          <h2 className="font-bold text-lg">More Description</h2>
          <p
            className="text-foreground text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductImagesSection;
