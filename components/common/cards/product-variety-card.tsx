import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/product";
import { Eye } from "lucide-react";
import Image from "next/image";
import RatingStars from "../product/rating-stars";

interface ProductVarietyCardProps {
  product: IProduct;
}

export default function ProductVarietyCard({ product }: ProductVarietyCardProps) {
  const imageSrc = product.images?.find(img => img.is_primary)?.file || "/fallback-image.jpg";
  const title = product.name;
  const rating = 5; // or if you have rating in IProduct, use it

  return (
    <section className="w-full max-w-sm sm:max-w-none flex-shrink-0 sm:flex-shrink sm:basis-1/3 px-2">
      {/* Product Image with Overlay Button */}
      <div className="relative mb-4 w-full overflow-hidden rounded-lg group cursor-pointer">
        <Image
          src={imageSrc}
          alt={title}
          width={800}
          height={500}
          className="w-full h-auto object-contain"
        />
        {/* Overlay Button */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button className="bg-primary hover:bg-sky-500 text-white font-medium w-48 h-10 rounded-full text-sm flex items-center justify-center gap-2">
            VIEW PRODUCTS
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center justify-between gap-1 mb-2">
        <RatingStars rating={rating} />
        <span className="text-sm text-foreground font-medium">
          {rating} of 5 by 265 People
        </span>
      </div>

      {/* Product Title */}
      <h3 className="text-sm sm:text-base font-semibold text-primary break-words">
        {title}
      </h3>
    </section>
  );
}
