"use client";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import DetailDecription from "./detail-description-section";
import { ProductImagesSectionProps, TimeLeftProps } from "@/types/product";

const ProductImagesSection: React.FunctionComponent<ProductImagesSectionProps> = ({ images, is_flash_sale, flashEndDate,
  onToggleWishlist, isWishlisted, is_new }) => {

  const [timeLeft, setTimeLeft] = useState<TimeLeftProps>({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const pad = (n: number) => n.toString().padStart(2, "0");


  const [selectedImage, setSelectedImage] = useState<string>(
    images?.[0]?.file || ""
  );

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
    <div className="w-full h-full space-y-8">
      {/* Main Image (responsive height) */}
      <div className="relative rounded-lg h-96 bg-[#f1f1f1] md:h-[600px]">
        {
          selectedImage && (
            <Image
              src={selectedImage}
              alt="Main product"
              fill
              className="object-center rounded-lg"
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
          is_new && <Badge className="absolute px-7 top-4 right-4 bg-blue-400 text-base text-white rounded-full">
            New
          </Badge>
        }
      </div>

      {
        images?.length > 1 && (
          <div className="grid grid-cols-4 gap-1 overflow-x-auto md:gap-6">
            {
              images.map((img) => (
                <div
                  key={img.id}
                  className={`flex-shrink-0 w-[85px] sm:w-[80px] md:w-full relative h-[100px] sm:h-[120px] md:h-[150px]
              ${selectedImage === img.file ? "border-2 border-primary rounded-md" : "border border-none"}`}
                  onClick={() => setSelectedImage(img.file)}
                >
                  <Image
                    src={img.file}
                    alt={`Product thumbnail ${img.id}`}
                    fill
                    className="object-center border-2 border-transparent rounded-md cursor-pointer"
                  />
                </div>
              ))
            }
          </div>
        )
      }

      {/* Flash Sale Badge */}
      {
        flashEndDate &&
          is_flash_sale &&
          new Date(flashEndDate).getDate() > new Date().getDate()
          && new Date(flashEndDate).getTime() > Date.now() ? (
          <div className="flex justify-between px-3 py-3 text-white rounded w-96 md:w-full bg-blue-400">
            <p className="font-semibold font-poppins pl-2">Flash Sales</p>
            <p className="text-base font-sfpro">
              Ends in {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)} Hrs
            </p>
          </div>
        ) : null
      }


      {/* Detail Description */}
      <DetailDecription />
    </div >
  );
};

export default ProductImagesSection;