interface ShippingDetailsInfo {
  label: string;
  value: string;
}

interface ShippingCardDetailsProps {
  shippingDetailsData: ShippingDetailsInfo[];
}

function ShippingCardDetails({
  shippingDetailsData,
}: ShippingCardDetailsProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Shipping Details
        </h2>
        <button className="bg-orange-500 text-white text-sm px-3 py-1 rounded-md hover:bg-orange-600">
          Pos Print
        </button>
      </div>
      <div className="divide-y space-y-1 divide-gray-200">
        {shippingDetailsData.map((item, index) => (
          <div key={index} className="py-2 grid grid-cols-2">
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
