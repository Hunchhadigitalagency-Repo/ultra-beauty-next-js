import React from "react";
import Image from "next/image";
import frameIcon from "@/assets/Frame.png";
import groupIcon from "@/assets/Group.png";
import vectorIcon from "@/assets/Vector.png";

const SignatureSection: React.FunctionComponent = () => {
  return (
    <div className="w-full md:w-full z-10 lg:w-1/2 ">
      <p className="text-sm md:text-base font-playfair mb-2">
        Ultra Beauty & Brand
      </p>

      <h1 className="text-2xl md:text-4xl font-bold text-[#FF2B5F] mb-4 font-playfair">
        Uncover Your Signature Beauty
      </h1>

      <p className="font-poppins text-sm sm:text-base md:text-lg text-foreground mb-6">
        Elevate your everyday routine with handpicked collections crafted for
        timeless elegance. From skin-perfecting essentials to bold statement
        shades—indulge in beauty that defines you.
      </p>

      <ul className="space-y-6">
        <li className="flex items-start gap-4 my-4">
          <div className="w-10 h-10 bg-[#FFEBED] rounded-full flex items-center justify-center mt-1">
            <Image src={frameIcon} alt="Frame Icon" className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold font-playfair text-sm md:text-base lg:text-lg">
              Curated Collections
            </h3>
            <p className="text-sm md:text-base font-playfair">
              Discover seasonally selected must-haves.
            </p>
          </div>
        </li>

        <li className="flex items-start gap-4 my-4">
          <div className="w-10 h-10 bg-[#FFEBED] rounded-full flex items-center justify-center mt-1">
            <Image src={vectorIcon} alt="Vector Icon" className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold font-playfair text-sm md:text-base lg:text-lg">
              Glow Edit
            </h3>
            <p className="text-sm md:text-base font-playfair">
              Explore radiant essentials for flawless skin.
            </p>
          </div>
        </li>

        <li className="flex items-start gap-4 my-4">
          <div className="w-10 h-10 bg-[#FFEBED] rounded-full flex items-center justify-center mt-1">
            <Image src={groupIcon} alt="Group Icon" className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold font-playfair text-sm md:text-base lg:text-lg">
              Signature Line
            </h3>
            <p className="text-sm md:text-base font-playfair">
              Premium picks that define our brand.
            </p>
          </div>
        </li>
      </ul>

      <button className="bg-primary text-white py-2 rounded-full text-sm md:text-base font-medium hover:bg-pink-700 transition md:px-20 px-[20%] mt-6">
        SHOP NOW →
      </button>
    </div>
  );
};

export default SignatureSection;
