import { printReceipt, ReceiptRow } from "@/lib/pos-print";
import { IOrders } from "@/types/orders";

interface ShippingCardDetailsProps {
  shippingDetailsData: IOrders;
}

function ShippingCardDetails({
  shippingDetailsData,
}: ShippingCardDetailsProps) {
  const shippingDetails: ReceiptRow[] = [
    {
      label: "Name",
      value: `${shippingDetailsData.shipping_info?.first_name} ${shippingDetailsData.shipping_info?.last_name}`,
    },
    {
      label: "Address",
      value: shippingDetailsData.shipping_info?.address,
    },
    { label: "Phone", value: shippingDetailsData.shipping_info?.phone_no },
    {
      label: "Alternative Phone",
      value: shippingDetailsData.shipping_info?.alternate_phone_no || '-',
    },
    { label: "Province", value: shippingDetailsData.shipping_info?.province },
    { label: "City", value: shippingDetailsData.shipping_info?.city },
    { label: "Landmark", value: shippingDetailsData.shipping_info?.landmark || ""},

    { label: "Email", value: shippingDetailsData.shipping_info?.email },
    { label: "Location", value: shippingDetailsData.shipping_info?.address },
  ];

  const handlePrint = () => {
    printReceipt(shippingDetails, 58, "Shipping Details");
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Shipping Details
        </h2>
        <button
          className="bg-black text-white text-sm px-3 py-1 rounded-md hover:bg-gray-500 cursor-pointer"
          onClick={handlePrint}
        >
          Pos Print
        </button>
      </div>
      <div className="divide-y space-y-1 divide-gray-200">
        {shippingDetails.map((item, index) => (
          <div key={index} className="py-3 grid grid-cols-2">
            <p className="w-48 text-sm text-gray-500 font-medium uppercase">
              {item.label}
            </p>
            <p className="text-sm text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ShippingCardDetails;
