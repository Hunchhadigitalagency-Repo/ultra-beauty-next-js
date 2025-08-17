import React from "react";

interface PriceRowProps {
  previousPrice?: string;
  price: string;
  discountTag?: string;
  className?: string;
  discountClassName?: string;
  priceClassname?: string;
}

const PriceRow = ({
  previousPrice,
  price,
  discountTag,
  className,
  discountClassName,
  priceClassname,
}: PriceRowProps) => {
  // console.log("this are the items", previousPrice, price, discountTag)
  return (
    <div className={`md:items-center  gap-3 md:gap-5  ${className}`}>
      <span className={`flex w-full justify-between ${priceClassname}`}>
        <span className="text-sm font-medium text-primary md:text-xl ">
          Nrs. {price}
        </span>
        <span className="text-sm font-normal font-bold text-green-500 md:text-base ">
          {discountTag?.split(".")[0]}%
        </span>
      </span>
      {/* {
        discountTag && (
          <span className={`bg-[#FF2B5F] text-white px-3 py-0.5 rounded-full ${discountClassName}`}>
            {discountTag}% Off
          </span>
        )
      } */}
    </div >
  );
};

export default PriceRow;
