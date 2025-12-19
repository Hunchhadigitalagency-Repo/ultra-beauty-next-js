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

  return (

    <div className={`md:items-center gap-3 md:gap-5  ${className}`}>
      <span className={`flex w-full items-center justify-between ${priceClassname}`}>
        {Number(previousPrice) > 0 && (
          <span className={`text-gray-400 text-[16px] font-semibold line-through`}>
            Nrs. {previousPrice}
          </span>
        )}
        <span className="text-base font-medium text-primary md:text-lg ">
          Nrs. {price}
        </span>
        {
          discountTag && (
            <span className={`text-[#1CA600] text-sm md:text-base px-3 py-0.5 rounded-full ${discountClassName}`}>
              {discountTag}% Off
            </span>
          )
        }
      </span>
    </div>
  );
};
export default PriceRow;