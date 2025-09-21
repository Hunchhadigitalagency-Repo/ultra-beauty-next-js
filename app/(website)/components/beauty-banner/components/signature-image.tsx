import React from "react";
import Image from "next/image";
import womanImage from "@/assets/Girl.png";
import Eclipse from "@/assets/Eclipse1.png";
import flowerImage from "@/assets/Flower.png";

const SignatureImage: React.FunctionComponent = () => {

  return (
    <div className="w-full md:w-1/2 lg:w-1/2 mt-10 md:mt-0  justify-center  z-10 hidden lg:flex ">
      <div className="relative ">
        <div>
          <Image
            src={womanImage}
            alt="woman image"
            className="relative z-10  top-[-60px] lg:left-0 2xl:left-[90px]"
          />
        </div>

        <div>
          <Image
            src={flowerImage}
            alt="flower image"
            className="absolute -bottom-20 lg:left-[30px] 2xl:left-[120px] z-20 "
          />
        </div>

        <div>
          <Image
            src={Eclipse}
            alt="eclipse"
            className="absolute z-0 bottom-[80px] w-[200px] h-[200px] lg:left-[50px] 2xl:left-[140px]"
          />
        </div>

        <div>
          <Image
            src={Eclipse}
            alt="eclipse"
            className="absolute z-0 bottom-[150px] w-[300px] h-[300px] lg:left-[212px] xl:left-[312px] 2xl:left-[469px]"
          />
        </div>

      </div>
    </div>
  );
};

export default SignatureImage;
