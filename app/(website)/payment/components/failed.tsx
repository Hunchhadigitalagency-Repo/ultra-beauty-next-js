import React from "react";
import { RxCross2 } from "react-icons/rx";

const Failed = () => {
  return (
    <div className="flex justify-center items-center border-2 h-170">
      <div className="flex flex-col gap-4 text-center">
        <div className="h-20 w-20 rounded-full border-2 mx-auto bg-red-600 flex justify-center items-center text-white text-3xl">
          <RxCross2 />
        </div>
        <h3 className="text-base md:text-lg font-semibold">
          Payment Failed !
        </h3>
        <p className="text-xs md:text-sm">
          Opps! Looks like something went wrong. Please try agin with another
          payment method
        </p>
        <button className="text-xs md:text-sm bg-primary px-5 py-2 mx-auto text-white">
          BACK TO PAYMENT
        </button>
      </div>
    </div>
  );
};

export default Failed;
