import React from 'react'
import Image from 'next/image'
import womanImage from '@/assets/Girl.png'
import flowerImage from "@/assets/Flower.png";
import Eclipse from "@/assets/Eclipse1.png";

const SignatureImage = () => {
  return (
    
     <div className="w-full md:w-1/3 mt-10 md:mt-0 flex justify-center  z-10 ">
     
        <div className="relative ">
          <Image src={womanImage} alt="woman image" className="relative z-10 hidden lg:block top-[-60px]"></Image>
          <Image
            src={flowerImage}
            alt="flower image"
            className="absolute bottom-[-60px] left-[50px] z-20 hidden lg:block"
          />
          <Image
          src={Eclipse}
          alt="eclipse"
          className="absolute z-0 bottom-[80px] w-[200px] h-[200px] left-[50px] hidden lg:block"
          />
          <Image
          src={Eclipse}
          alt="eclipse"
          className="absolute z-0 bottom-[150px] w-[300px] h-[300px] left-[200px] hidden lg:block"
          />
        </div>
        
      </div>
    
  )
}

export default SignatureImage