import React from "react";
import { FaRegCalendarAlt, FaRegStar, FaGift } from "react-icons/fa";
import womanImage from "../../../assets/Girl.jpg";
import flowerImage from '../../../assets/Flower.png'
import lineImge from '../../../assets/Line.png'
import Image from 'next/image'

const Beauty_Banner: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-white relative overflow-hidden padding">
      <div className="w-full md:w-1/2 z-10">
        <p className="text-sm text-gray-700 mb-2 ">Ultra Beauty & Brand</p>
        <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">
          Uncover Your Signature Beauty
        </h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Elevate your everyday routine with handpicked collections crafted for
          timeless elegance. From skin-perfecting essentials to bold statement
          shades—indulge in beauty that defines you.
        </p>

        <ul className="space-y-4 mb-6">
          <li className="flex items-start gap-3">
            <FaRegCalendarAlt className="text-pink-500 text-lg mt-1" />
            <div>
              <h3 className="font-semibold">Curated Collections</h3>
              <p className="text-sm text-gray-600">
                Discover seasonally selected must-haves.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <FaRegStar className="text-pink-500 text-lg mt-1" />
            <div>
              <h3 className="font-semibold">Glow Edit</h3>
              <p className="text-sm text-gray-600">
                Explore radiant essentials for flawless skin.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <FaGift className="text-pink-500 text-lg mt-1" />
            <div>
              <h3 className="font-semibold">Signature Line</h3>
              <p className="text-sm text-gray-600">
                Premium picks that define our brand.
              </p>
            </div>
          </li>
        </ul>

        <button className="bg-pink-600 text-white py-2 rounded-full text-sm font-medium hover:bg-pink-700 transition px-[80px]">
          SHOP NOW →
        </button>
      </div>
      <div className="w-full md:w-1/3 mt-10 md:mt-0 flex justify-center relative z-0 ">
      <div className="relative">
        <Image src={womanImage} alt="woman image"></Image>
        <Image src={flowerImage}alt="flower image" className="absolute bottom-[-100px]"/>
        
      </div>
        
        
      </div>
      <Image src={lineImge} alt="Line Image " className="absolute bottom-[120px]"/>
    </div>
  );
};

export default Beauty_Banner;
