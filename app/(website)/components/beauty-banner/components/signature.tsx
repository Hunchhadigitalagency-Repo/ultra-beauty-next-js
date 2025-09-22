import React from "react";
import { FaRegStar } from 'react-icons/fa';
import { BiCollection } from 'react-icons/bi';
import { GiBottleVapors } from 'react-icons/gi';
import Link from "next/link";

const SignatureSection: React.FunctionComponent = () => {
  return (
    <div className="z-10 w-full md:w-full lg:w-1/2">
      <p className="mb-2 text-sm md:text-base font-playfair">
        Ultra Beauty & Brand
      </p>

      <h1 className="text-2xl md:text-4xl font-bold text-[#FF2B5F] mb-4 font-playfair">
        Uncover Your Signature Beauty
      </h1>

      <p className="mb-6 text-sm font-poppins sm:text-base md:text-sm text-foreground">
        Elevate your everyday routine with handpicked collections crafted for
        timeless elegance. From skin-perfecting essentials to bold statement
        shades—indulge in beauty that defines you.
      </p>

      <ul className="space-y-6">
        <li className="flex items-start gap-4 my-4">
          <div className="w-10 h-10 bg-[#FFEBED] rounded-full flex items-center justify-center mt-1 text-primary">
            <GiBottleVapors size={24} />
          </div>
          <div>
            <h3 className="text-sm font-semibold font-playfair md:text-base lg:text-lg">
              Curated Collections
            </h3>
            <p className="text-sm font-playfair">
              Discover seasonally selected must-haves.
            </p>
          </div>
        </li>

        <li className="flex items-start gap-4 my-4">
          <div className="w-10 h-10 bg-[#FFEBED] rounded-full flex items-center justify-center mt-1 text-primary">
            <FaRegStar size={24} />
          </div>
          <div>
            <h3 className="text-sm font-semibold font-playfair md:text-base lg:text-lg">
              Glow Edit
            </h3>
            <p className="text-sm font-playfair">
              Explore radiant essentials for flawless skin.
            </p>
          </div>
        </li>

        <li className="flex items-start gap-4 my-4">
          <div className="w-10 h-10 bg-[#FFEBED] rounded-full flex items-center justify-center mt-1 text-primary">
            <BiCollection size={24} />
          </div>
          <div>
            <h3 className="text-sm font-semibold font-playfair md:text-base lg:text-lg">
              Signature Line
            </h3>
            <p className="text-sm font-playfair">
              Premium picks that define our brand.
            </p>
          </div>
        </li>
      </ul>

      <Link href="/shop">
        <button className="cursor-pointer bg-primary text-white py-2 rounded-full text-sm md:text-base font-medium hover:bg-pink-700 transition md:px-20 px-[20%] mt-6">
          SHOP NOW →
        </button>
      </Link>
    </div>
  );
};

export default SignatureSection;
