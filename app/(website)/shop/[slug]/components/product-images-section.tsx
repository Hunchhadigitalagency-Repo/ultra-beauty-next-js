"use client";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { ProductImagesSectionProps, TimeLeftProps } from "@/types/product";

const ProductImagesSection: React.FunctionComponent<ProductImagesSectionProps> = ({
  images,
  is_flash_sale,
  flashEndDate,
  onToggleWishlist,
  active_image,
  isWishlisted,
  is_new
}) => {

  const [timeLeft, setTimeLeft] = useState<TimeLeftProps>({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const pad = (n: number) => n.toString().padStart(2, "0");

  const [selectedImage, setSelectedImage] = useState<string>(
    active_image || images?.[0]?.file || ""
  );

  useEffect(() => {
    if (active_image) {
      setSelectedImage(active_image)
    }
  }, [active_image])

  useEffect(() => {
    if (!flashEndDate) return;

    const updateCountdown = () => {
      const end = new Date(flashEndDate).getTime();
      const now = new Date().getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [flashEndDate]);

  return (
    <div className="h-full w-[90vw] sm:w-full space-y-8">
      {/* Main Image (responsive height) */}
      <div className="relative rounded-lg h-96 bg-[#f1f1f1] md:h-[600px]">
        {
          selectedImage && (
            <Image
              src={selectedImage}
              alt="Main product"
              fill
              className="object-contain rounded-lg"
            />
          )
        }
        <Button onClick={onToggleWishlist}
          variant="ghost"
          size="icon"
          className="absolute bg-white rounded-full top-4 left-4 hover:bg-white/80"
        >
          <Heart
            className={`size-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
        </Button>
        {
          is_new && <Badge className="absolute text-base text-white bg-blue-400 rounded-full px-7 top-4 right-4">
            New
          </Badge>
        }
      </div>
      {images?.length > 1 && (
        <div className="flex gap-4 overflow-x-auto py-2 px-2 scrollbar-hide">
          {images.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img.file)}
              className={`
          flex-shrink-0 relative 
          w-[75px] h-[75px] sm:w-[80px] sm:h-[120px] md:w-[120px] md:h-[130px] 
          rounded-md overflow-hidden
          cursor-pointer 
          transition-all duration-200
          ${selectedImage === img.file ? "border-2 border-primary scale-105" : "border border-gray-200 hover:border-gray-400"}
        `}
            >
              <Image
                src={img.file}
                alt={`Product thumbnail ${img.id}`}
                fill
                className="object-fit w-full h-full rounded-md"
              />
            </div>
          ))}
        </div>
      )}

      {
        flashEndDate &&
          is_flash_sale &&
          new Date(flashEndDate).getDate() > new Date().getDate()
          && new Date(flashEndDate).getTime() > Date.now() ? (
          <div className="w-[90vw] flex justify-between px-3 py-3 text-white bg-blue-400 rounded sm:w-96 md:w-full">
            <p className="sm:pl-2 font-semibold font-poppins">Flash Sales</p>
            <p className="text-base font-sfpro">
              Ends in {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)} Hrs
            </p>
          </div>
        ) : null
      }
    </div >
  );
};

export default ProductImagesSection;