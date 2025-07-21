import React from "react";
import Image from "next/image";
import { FaRegBell } from "react-icons/fa";
import Rectangle1 from "@/assets/Rectangle227.png";
import image1 from "@/assets/Luxury-Beauty.png";
const UltraBeauty = () => {
  return (
    <div
      className=" w-full padding text-white bg-contain"
      style={{ backgroundImage: `url(${Rectangle1.src})` }}
    >
      <div className="w-full md:w-[60%] ">
        <h1 className="font-playfair lg:text-3xl text-xl font-bold text-[#FF2B5F] py-5 text-center md:text-left">We are Ultra Beauty & Brand</h1>
        <p className="text-sm md:text-base tracking-tight">
          Cosmetic products are substances or preparations designed for
          application on the external parts of the human body such as the skin,
          hair, nails, lips, and teeth — with the primary purpose of cleansing,
          beautifying, enhancing appearance, or promoting attractiveness. These
          products do not alter the body&apos;s structure or physiological functions,
          distinguishing them from pharmaceutical or therapeutic agents.
        </p>
        <div className="flex justify-between gap-4 my-20 flex-wrap">
          <div className="flex justify-between md:w-[48%]  w-full gap-3">
            <div className="bg-[#FADADD] text-black  w-[120%] h-[50%] rounded-full flex justify-center items-center">
              <FaRegBell className="text-2xl"/>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-playfair text-bold text-[#FF2B5F] py-2 ">Something One</h3>
              <p className="text-left text-sm md:text-base md:tracking-tight ">
                Aesthetic and hygiene related functions. Cosmetic formulations
                often contain a combination of water, emollients, humectants,
                preservatives, fragrances, colorants, and active ingredients.
              </p>
            </div>
          </div>
          <div className="flex  gap-3 md:w-[48%]  w-full">
            <div className="bg-[#FADADD] text-black  w-[120%] h-[50%] rounded-full flex justify-center items-center">
              <FaRegBell className="text-2xl"/>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-playfair text-bold text-[#FF2B5F] py-2">Something Two</h3>
              <p className="text-left text-sm md:text-base tracking-tight ">
                Aesthetic and hygiene related functions. Cosmetic formulations
                often contain a combination of water, emollients, humectants,
                preservatives, fragrances, colorants, and active ingredients.
              </p>
            </div>
          </div>
        </div>

        
        <div className="absolute md:right-0 md:top-90  hidden md:block">
          <Image src={image1} alt="Beauty Image" />
       
        
      </div>
      </div>
      
    </div>
  );
};

export default UltraBeauty;
