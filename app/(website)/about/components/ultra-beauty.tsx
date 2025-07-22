import React from "react";
import Image from "next/image";
import { FaRegBell } from "react-icons/fa";
import Rectangle1 from "@/assets/Rectangle227.png";
import image1 from "@/assets/Luxury-Beauty.png";
const UltraBeauty = () => {
  return (
    <div
      className=" w-full padding text-white bg-contain my-25 relative"
      style={{ backgroundImage: `url(${Rectangle1.src})` }}
    >
      <div className="w-full lg:w-[60%] ">
        <h1 className="font-playfair lg:text-3xl text-xl font-bold text-[#FF2B5F] py-5 text-center md:text-left">We are Ultra Beauty & Brand</h1>
        <p className=" text-sm md:text-base tracking-tight text-justify ">
          Cosmetic products are substances or preparations designed for
          application on the external parts of the human body such as the skin,
          hair, nails, lips, and teeth — with the primary purpose of cleansing,
          beautifying, enhancing appearance, or promoting attractiveness. These
          products do not alter the body&apos;s structure or physiological functions,
          distinguishing them from pharmaceutical or therapeutic agents.
        </p>
        <div className="flex justify-between gap-4 mt-20 flex-wrap md:flex-col lg:flex-row">
          <div className="flex justify-between lg:w-[48%]  w-full gap-3">
          <div className="bg-[#FADADD] text-black  md:w-[86px] md:h-[86px] rounded-full flex justify-center items-center md:min-w-[86px] md:min-h-[86px] min-w-[60px] min-h-[60px] w-[60px] h-[60px]">
              <FaRegBell className="text-2xl"/>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-playfair text-bold text-[#FF2B5F] py-2 ">Something One</h3>
              <p className=" text-sm md:text-base md:tracking-tighter text-justify">
                Aesthetic and hygiene related functions. Cosmetic formulations
                often contain a combination of water, emollients, humectants,
                preservatives, fragrances, colorants, and active ingredients.
              </p>
            </div>
          </div>
          <div className="flex  gap-3 lg:w-[48%]  w-full ">
             <div className="bg-[#FADADD] text-black  md:w-[86px] md:h-[86px] rounded-full flex justify-center items-center md:min-w-[86px] md:min-h-[86px] min-w-[60px] min-h-[60px] w-[60px] h-[60px]">
              <FaRegBell className="text-2xl"/>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-playfair text-bold text-[#FF2B5F] py-2">Something Two</h3>
              <p className="text-justify text-sm md:text-base tracking-tighter ">
                Aesthetic and hygiene related functions. Cosmetic formulations
                often contain a combination of water, emollients, humectants,
                preservatives, fragrances, colorants, and active ingredients.
              </p>
            </div>
          </div>
        </div>

        
        <div className="absolute md:right-0 lg:right-0 lg:-bottom-30  hidden md:block md:w-[42%] lg:w-1/3  ">
          <Image src={image1} alt="Beauty Image" />
       
        
      </div>
      </div>
      
    </div>
  );
};

export default UltraBeauty;
