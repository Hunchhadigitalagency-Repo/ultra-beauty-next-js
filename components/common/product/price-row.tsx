import React from "react";

interface PriceRowProps {
  previousPrice: string;
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
  console.log("this are the items", previousPrice, price, discountTag)
  return (
    <div className={`md:items-center  gap-3 md:gap-5  ${className}`}>
      <span className={`flex w-full justify-between ${priceClassname}`}>
        <span className="text-sm md:text-base font-normal text-[#7A7A7A] line-through">
          Nrs. {previousPrice}
        </span>
        <span className=" text-sm md:text-xl  text-[#FF2B5F] font-bold">
          Nrs. {price}
        </span>
        
      </span>
      {
        discountTag && (
          <span className={`bg-[#FF2B5F] text-white px-3 py-0.5 rounded-full ${discountClassName}`}>
            {discountTag}% Off
          </span>
        )
      }
    </div >
  );
};

export default PriceRow;
