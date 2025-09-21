import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface BrandsCardProps {
  image: StaticImageData | string;
}

const MainBrandcard: React.FunctionComponent<BrandsCardProps> = ({ image }) => {

  return (
    <div className="flex justify-center items-center bg-white border border-red-300 rounded-none">
      <div className="relative w-28 h-11 md:h-32 md:w-3xl overflow-hidden rounded-lg">
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

export default MainBrandcard;
