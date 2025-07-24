import React from 'react';
import Image from 'next/image';

interface GlowKitProps {
  image: string;
  title: string;
  desc: string;
}
const GlowKitCard: React.FC<GlowKitProps> = ({ image }) => {
  return (
    <div className="flex justify-center items-center w-full  rounded-md">
      <div className="relative  w-full h-32 md:h-60 lg:h-80 xl:h-96 overflow-hidden rounded-lg">
        <Image
          src={image}
          alt="brand logo"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  )
}

export default GlowKitCard