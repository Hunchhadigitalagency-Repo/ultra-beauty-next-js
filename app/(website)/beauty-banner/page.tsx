import React from "react";
import lineImge from "@/assets/Line.png";
import Image from "next/image";
import SignatureSection from "./components/Signature"
import SignatureImage from "./components/signature-image";

const BeautyBanner: React.FC = () => {
  
  return (
    <>
    
    <div className="relative bg-[#FAFAFA] padding">
  
    <div className="flex flex-col md:flex-row justify-between ">
    <SignatureSection/>
     <SignatureImage/>
    </div>
    <Image
        src={lineImge}
        alt="Line Image "
        className="absolute bottom-[100px] z-0 overflow-hidden w-[95%]"
      />
    </div>
      </>
  );
};

export default BeautyBanner;
