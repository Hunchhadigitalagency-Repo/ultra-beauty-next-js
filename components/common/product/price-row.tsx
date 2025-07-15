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
      <span className={`flex gap-3 justify-between ${priceClassname}`}>
        <span className="text-red text-[15px] md:text-lg font-bold line-through">
          Nrs. {previousPrice}
        </span>
        <span className="text-[15px] md:text-lg font-bold text-green">Nrs. {price}</span>
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
