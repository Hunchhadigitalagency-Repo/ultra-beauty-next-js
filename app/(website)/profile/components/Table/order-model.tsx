import React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { IOrderDetail } from "./order-table";

type Props = {
  order: IOrderDetail[];
  onClose: () => void;
  order_created?: string;
};

const OrderDetailsModal = ({ order, onClose }: Props) => {

  const getItemData = (item: IOrderDetail) => {
    console.log("this is the item iu am getting ", item)
    const source = item.product_variant ?? item.product;

    return {
      image: source?.item_image || "/placeholder.svg",
      name: source?.item_name || "Unnamed Product",
      quantity: item.quantity,
      unit_price: item.price,
      total_amount: item.total_price,
      status: item.status || "N/A",
      orderNumber: item.id || "N/A",
    };
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl relative p-6 max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Order Details</h2>

        <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
          {order.map((item: IOrderDetail, index: number) => {
            const data = getItemData(item);
            console.log("this is the data", data)
            return (
              <div
                key={index}
                className="relative flex flex-col p-4 rounded-lg border-b"
              >
                <div className="flex flex-row gap-4 items-start">
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="relative w-[90px] h-[110px] rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                      <Image
                        src={data.image}
                        alt={data.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 w-full">
                    <div className="flex flex-col flex-1 w-full">
                      <div className="flex gap-2 mb-2">
                        <Badge
                          variant="outline"
                          className="bg-gray-50 border-gray-200 text-[11px] md:text-sm md:h-[30px] md:w-[150px] w-[80px] rounded-[2px]">
                          Order ID #{data.quantity}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-gray-50 border-gray-200 text-[11px] md:text-sm md:h-[30px] md:w-[150px] w-[80px] rounded-[2px]">
                          Quantity: {data.quantity}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-gray-50 border-gray-200 text-[11px] md:text-sm md:h-[30px] md:w-[150px] w-[100px] rounded-[2px]"
                        >
                          status: {data.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        {data.name}
                      </h3>
                    </div>
                    <div className="flex gap-4 mb-3">
                      {/* Unit Price */}
                      <div className="flex flex-col bg-blue-50 text-blue-800 px-4 py-2 rounded-lg shadow-sm w-1/2">
                        <span className="text-xs font-medium">Unit Price</span>
                        <span className="text-sm font-semibold">NPR {data.unit_price}</span>
                      </div>

                      {/* Total Amount */}
                      <div className="flex flex-col bg-green-50 text-green-800 px-4 py-2 rounded-lg shadow-sm w-1/2">
                        <span className="text-xs font-medium">Total Amount</span>
                        <span className="text-sm font-semibold">NPR {data.total_amount}</span>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
