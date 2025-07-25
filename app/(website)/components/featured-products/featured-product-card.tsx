
import React, { FC } from "react";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IFeature } from "@/types/product";


export interface FeaturedProductCardProps {
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
  features: IFeature[];
  rating: number;
  ratingCount: number;
  buttonText: string;
  onButtonClick?: () => void;
  /** if true, swaps image and text blocks on md+ screens */
  reverse?: boolean;
}

const FeaturedProductCard: FC<FeaturedProductCardProps> = ({
  imageSrc,
  alt,
  title,
  description,
  features,
  rating,
  ratingCount,
  buttonText,
  onButtonClick,
  reverse = false,
}) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  const containerClasses = [
    "flex flex-col md:flex-row",
    reverse && "md:flex-row-reverse",
    " rounded-lg overflow-hidden ",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <div className="relative w-full md:w-1/2 h-[400px]">
        <Image src={imageSrc} alt={alt} fill className="object-cover" />

        {features.map((feat, i) => (
          <span
            key={i}
            className={`absolute bg-white-80 text-sm font-medium px-2 py-1 rounded shadow ${feat.position}`}
          >
            {feat.label}
          </span>
        ))}
      </div>

      <div className="p-2 md:p-6 flex flex-col items-center justify-center w-full md:w-1/2 gap-4">
        <div className="flex flex-col gap-2 mb-6 ">
          <h3 className="text-2xl font-bold text-primary">{title}</h3>
          <p className="text-foreground text-sm leading-relaxed">{description}</p>
        </div>

        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-nowrap items-center justify-between gap-4 overflow-hidden">
            <div className="flex gap-1 flex-nowrap">
              {[...Array(fullStars)].map((_, i) => (
                <Star
                  key={`star-full-${i}`}
                  className="w-5 h-5 fill-orange-400 text-orange-400"
                />
              ))}
              {halfStar && (
                <Star
                  key="star-half"
                  className="w-5 h-5 fill-gradient-to-r from-orange-400 to-gray-200 text-orange-400"
                />
              )}
            </div>

            <span className="text-sm sm:text-base font-medium text-gray-800 whitespace-nowrap">
              {rating.toFixed(1)} of 5 by {ratingCount} People
            </span>
          </div>


          <Button
            variant="default"
            onClick={onButtonClick}
            className="text-black  rounded-full w-full md:w-[293px] h-11 uppercase"
          >
            {buttonText} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductCard;