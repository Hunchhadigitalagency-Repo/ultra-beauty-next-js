import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface BrandsCardProps {
  image: StaticImageData | string;
}

const BrandsCard: React.FC<BrandsCardProps> = ({ image }) => {
  return (
    <div className="flex items-center justify-center p-4 border border-red-300 rounded-sm">
      <div className="relative w-48 h-16 overflow-hidden rounded-lg md:w-60 md:h-24 lg:h-24 lg:w-80">
        <Image
          src={image}
          alt="brand logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default BrandsCard;
