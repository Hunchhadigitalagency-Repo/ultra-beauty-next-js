import Image from 'next/image';
import React from 'react'

interface GlowKitProps {
    image: string;
    title: string;
    desc:string;
  }
const GlowKitCard:React.FC<GlowKitProps> = ({image}) => {
  return (
    <div className="flex justify-center items-center w-[90%]  rounded-md ">
      <div className="relative  w-full h-40 md:h-80 lg:h-96 overflow-hidden rounded-lg">
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