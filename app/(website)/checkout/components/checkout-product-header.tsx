import React from "react";

interface CheckoutProductHeaderProps {
  selectedItem: number;
  totalItems: number;
  totalQuantity: number;
}

const CheckoutProductHeader = ({
  selectedItem,
  totalItems,
  totalQuantity,
}: CheckoutProductHeaderProps) => {
  return (
    <div className="py-2 px-4 bg-secondary rounded-sm font-medium text-custom-black text-base flex items-center justify-between gap-4">
      <h4>
        Package {selectedItem} of {totalItems}
      </h4>
      <h4>Quantity: {totalQuantity}</h4>
    </div>
  );
};

export default CheckoutProductHeader;
