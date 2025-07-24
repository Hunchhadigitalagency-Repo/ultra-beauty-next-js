import React from "react";
import Image from "next/image";
import lineImge from "@/assets/Line.png";
import SignatureSection from "./components/signature";
import SignatureImage from "./components/signature-image";

const BeautyBanner: React.FunctionComponent = () => {

  return (
    <div className="relative bg-[#FAFAFA] padding-x pt-4 sm:pt-6 lg:pt-8">
      <div className="flex flex-col md:flex-row justify-between ">
        <SignatureSection />
        <SignatureImage />
      </div>
      <Image
        src={lineImge}
        alt="Line Image "
        className="absolute left-0 w-full bottom-13 z-0 overflow-hidden"
      />
    </div>
  );
};

export default BeautyBanner;
