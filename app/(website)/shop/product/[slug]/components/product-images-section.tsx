"use client";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { ProductImagesSectionProps, TimeLeftProps } from "@/types/product";


const ProductImagesSection: React.FunctionComponent<ProductImagesSectionProps> = ({ images, is_flash_sale, flashEndDate,
  onToggleWishlist,
  isWishlisted }) => {

  const [timeLeft, setTimeLeft] = useState<TimeLeftProps>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [selectedImage, setSelectedImage] = useState<string>(
    images?.[0]?.file || ""
  );

  const timeNow = new Date().getTime().toString();

  useEffect(() => {
    if (!flashEndDate) return;

    const updateCountdown = () => {
      const end = new Date(flashEndDate).getTime();
      const now = new Date().getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [flashEndDate]);


  return (
    <div className="w-full h-full space-y-8">
      {/* Main Image (responsive height) */}
      <div className="relative h-96 bg-[#f1f1f1] md:h-[600px]">
        {selectedImage && (
          <Image
            src={selectedImage}
            alt="Main product"
            fill
            className="object-contain rounded-lg"
          />
        )}
        <Badge className="absolute py-2 px-8 top-4 left-2 bg-[#40C040] text-sm text-white">
          Best Seller
        </Badge>
        <Button onClick={onToggleWishlist}
          variant="ghost"
          size="icon"
          className="absolute bg-white rounded-full top-4 right-4 hover:bg-white/80"
        >
          <Heart
            className={`size-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
        </Button>
      </div>

      {images?.length > 1 && (
        <div className="grid grid-cols-4 gap-1 overflow-x-auto md:gap-6">
          {images.map((img) => (
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
                className="object-cover border-2 border-transparent rounded-lg cursor-pointer hover:border-primary"
              />
            </div>
          ))}
        </div>
      )}

      {/* Flash Sale Badge */}
      {flashEndDate && is_flash_sale &&
        flashEndDate <= timeNow &&
        <React.Fragment>
          <div className="flex justify-between px-3 py-3 text-white rounded-lg w-96 md:w-full bg-secondary ">
            <span className="font-semibold font-poppins">Hurry Up! Offers Expire in</span>
          </div>
          <div className="flex w-full gap-10">
            {Object.entries(timeLeft).map(([key, value]) => (
              <div key={key}>
                <h1 className="flex items-center justify-center font-semibold text-sm md:text-lg w-14 h-14 border border-secondary bg-[#FFE6E8] rounded-full">
                  {value}
                </h1>
                <h1 className="text-sm font-sfpro">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h1>
              </div>
            ))}
          </div>
        </React.Fragment>
      }
    </div >
  );
};

export default ProductImagesSection;