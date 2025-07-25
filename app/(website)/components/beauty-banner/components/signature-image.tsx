import React from "react";
import Image from "next/image";
import womanImage from "@/assets/Girl.png";
import Eclipse from "@/assets/Eclipse1.png";
import flowerImage from "@/assets/Flower.png";

const SignatureImage: React.FunctionComponent = () => {
  return (
    <div className="w-full md:w-1/3 mt-10 md:mt-0  justify-center  z-10 hidden lg:flex ">
      <div className="relative ">
        <div>
          <Image
            src={womanImage}
            alt="woman image"
            className="relative z-10  top-[-60px]"
          />
        </div>

        <div>
          <Image
            src={flowerImage}
            alt="flower image"
            className="absolute -bottom-20 left-[30px] z-20 "
          />
        </div>

        <div>
          <Image
            src={Eclipse}
            alt="eclipse"
            className="absolute z-0 bottom-[80px] w-[200px] h-[200px] left-[50px] "
          />
        </div>

        <div>
          <Image
            src={Eclipse}
            alt="eclipse"
            className="absolute z-0 bottom-[150px] w-[300px] h-[300px] left-[200px] "
          />
        </div>

      </div>
    </div>
  );
};

export default SignatureImage;
