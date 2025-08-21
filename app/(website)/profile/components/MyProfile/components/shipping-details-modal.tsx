import GenericModal from "@/components/common/modals/generic-modal";
import { SHIPPING_DETAILS } from "@/constants/shipping-details-data";
import React from "react";

interface ShippingDetailsModalProps {
  onClose: () => void;
}

const ShippingDetailsModal: React.FunctionComponent<
  ShippingDetailsModalProps
> = ({ onClose }) => {
  return (
    <GenericModal
      title="Shipping Details"
      setIsOptionClick={onClose}
      titleClassName="text-primary font-poppins font-normal text-base xl:text-xl"
    >
      {SHIPPING_DETAILS.map((item, index) => (
        <div key={index} className="grid grid-cols-[35%_65%]">
          <p className="text-sm font-medium lg:text-base">{item.label}</p>
          <p className="text-sm font-medium lg:text-base">: {item.value}</p>
        </div>
      ))}
    </GenericModal>
  );
};

export default ShippingDetailsModal;
