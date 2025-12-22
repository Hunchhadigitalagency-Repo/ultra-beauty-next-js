import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import OrderProductDetails from "./Order-Details";
import { CreateOrderResponse } from "@/types/orders";

interface OrderHeaderDetails {
  orderItems: CreateOrderResponse | null;
}

const OrderHeader: React.FunctionComponent<OrderHeaderDetails> = ({ orderItems }) => {
  const router = useRouter();
  const { id, order_details, order_status } = orderItems ?? {};

  const handleCancelOrder = () => {
    router.push(`/cancel-order/${id}`);
  };

  const checkOrderStatus = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-600 text-white";
      case "returned":
        return "bg-orange-500 text-white";
      case "cancelled":
        return "bg-red-600 text-white";
      case "pending":
        return "bg-gray-500 text-white"; 
      default:
        return "bg-gray-500 text-white";
    }
  };
const hasAllReturn = orderItems?.order_details.some(or => or.status === "returned")

  return (
    <section className="shadow rounded-xs">
      <div className="flex items-center justify-between h-10 px-4 text-sm font-medium rounded-xs md:h-12 md:px-6 bg-secondary text-custom-black">
        {/* Left side: Order Info */}
        <div className="flex flex-wrap gap-2 text-xs md:gap-6 xl:gap-8 font-poppins md:text-sm items-center">
          <h4>
            Order No: <span className="font-semibold">{id}</span>
          </h4>
          
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs md:gap-6 md:text-sm">
          <h4>Total Items: {order_details?.length}</h4>

          {order_status?.name && (
            <Button
              disabled={
                order_status?.name.toLowerCase() === "cancelled" ||
                order_status?.name.toLowerCase() === "returned"
              }
              className={`uppercase rounded-xs text-[10px] md:text-sm px-2 md:px-3 py-1.5 ${hasAllReturn && "!text-gray-600 !bg-white"} ${checkOrderStatus(
                order_status?.name.toLowerCase()
              )}`
            }
            >
              {hasAllReturn ? "Returned " :order_status?.name}
            </Button>
          )}

          {!order_status?.name?.toLowerCase().includes("delivered") && (
            <Button
              disabled={
                order_status?.name.toLowerCase() === "cancelled" ||
                order_status?.name.toLowerCase() === "returned"
              }
              onClick={handleCancelOrder}
              className="text-white rounded-xs cursor-pointer uppercase text-[10px] md:text-sm px-2 md:px-3 py-1.5 bg-red-600 text-center"
            >
              Cancel Order
            </Button>
          )}

          <Button
            onClick={() => router.push(`/order-tracking?order_id=${id}`)}
            className="text-white rounded-xs cursor-pointer uppercase text-[10px] md:text-sm px-2 md:px-3 py-1.5 bg-orange-500 text-center"
          >
            Track Order
          </Button>
        </div>
      </div>

      <OrderProductDetails
        id={id}
        orderStatus={order_status}
        orderDetails={orderItems?.order_details || []}
      />
    </section>
  );
};

export default OrderHeader;
