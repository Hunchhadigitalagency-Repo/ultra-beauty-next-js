import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface BrandsCardProps {
  image: StaticImageData | string;
}

const BrandsCard: React.FC<BrandsCardProps> = ({ image }) => {
  return (
    <div className="flex justify-center items-center  border border-red-300 rounded-sm p-4">
      <div className="relative w-48 h-16 md:w-60 md:h-24 lg:h-36 lg:w-80 overflow-hidden rounded-lg">
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
