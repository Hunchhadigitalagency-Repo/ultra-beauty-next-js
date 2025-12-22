import { ShippingData } from "@/app/(website)/checkout/components/shipping-details-form";
import GenericModal from "@/components/common/modals/generic-modal";
import { SHIPPING_LABELS } from "@/schemas/shipping/shipping-schema";
import React from "react";

interface ShippingDetailsModalProps {
  onClose: () => void;
  shipping: ShippingData | undefined;
}

const ShippingDetailsModal: React.FunctionComponent<
  ShippingDetailsModalProps
> = ({ onClose, shipping }) => {
  return (
    <GenericModal
      title="Shipping Details"
      setIsOptionClick={onClose}
      titleClassName="text-primary font-poppins font-normal text-base xl:text-xl"
    >
      {shipping &&
        (
          [
            "first_name",
            "last_name",
            "email",
            "phone_no",
            "alternate_phone_no",
            "province",
            "city",
            "landmark",
            "address",
          ] as (keyof ShippingData)[]
        ).map((key) => (
          <div key={key} className="grid grid-cols-[35%_65%]">
            <p className="text-sm font-medium lg:text-sm">
              {SHIPPING_LABELS[key]}
            </p>
            <p className="text-sm font-medium lg:text-sm">
              : {shipping[key] ?? "-"}
            </p>
          </div>
        ))}
    </GenericModal>
  );
};

export default ShippingDetailsModal;
