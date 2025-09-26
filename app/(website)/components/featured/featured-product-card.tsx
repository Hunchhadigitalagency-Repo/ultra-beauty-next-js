import React from 'react';
import Image from 'next/image';

interface FeaturedProductCardProps {
  image: string;
  title: string;
  desc: string;
  onFeaturedProductClick?: () => void;
}

const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({ image, title, desc, onFeaturedProductClick }) => {

  return (
    <div className="cursor-pointer flex flex-col gap-3 justify-center items-center w-full" onClick={onFeaturedProductClick}>
      <div className="relative w-full h-44 md:h-60 lg:h-80 xl:h-96 overflow-hidden rounded-md">
        <Image
          src={image}
          alt="brand logo"
          layout="fill"
          objectFit="object-cover"
        />
      </div>
      <div className=" flex flex-col">
        <p className="text-[#7A7A7A] text-center text-xs sm:text-sm">
          {title}
        </p>
        <h3 className="text-base md:text-lg lg:text-xl font-semibold font-playfair text-foreground">
          {desc}
        </h3>
      </div>
    </div>
  )
}

export default FeaturedProductCard