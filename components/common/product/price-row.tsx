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
        <span className="text-primary text-sm md:text-xl font-medium ">
          Nrs. {price}
        </span>
        <span className="text-sm md:text-base font-normal text-[#7A7A7A] line-through">
          Nrs. {previousPrice}
        </span>
      </span>
      {
        discountTag && (
          <span className={`bg-green text-white px-3 py-0.5 rounded-full ${discountClassName}`}>
            {discountTag}% Off
          </span>
        )
      }
    </div >
  );
};

export default PriceRow;
