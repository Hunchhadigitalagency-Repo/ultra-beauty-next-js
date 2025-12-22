import Image from "next/image";
import { Col } from "@/types/table";
import { useRouter } from "next/navigation";
import { OrderResponse } from "@/types/profile";


export const MyOrderConstants = (): Col<OrderResponse>[] => {
  const router = useRouter();

  return [
    {
      title: "Order Number",
      render: (order: OrderResponse) => order.id,
    },
    {
      title: "Order Date",
      render: (order: OrderResponse) => new Date(order.order_created).toLocaleString([], {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).toUpperCase(),
    },
    {
      title: "Items",
      render: (order: OrderResponse) => (
        <div className="flex items-center gap-2">
          {order?.order_details?.slice(0, 3).map((item, index) => (
            <div key={index}>
              <div className="relative w-10 h-10">
                <Image
                  src={item.product.image}
                  alt=""
                  className="object-cover rounded-sm"
                  layout="fill"
                />
              </div>
            </div>
          ))}
          {order?.order_details?.length > 3 && <span>+{order?.order_details?.length - 3}</span>}
        </div>
      ),
    },
    {
      title: 'Order Status',
      render: (order: OrderResponse) => (
        <button
          style={{
            backgroundColor: order.order_status?.primary_color,
            color: order.order_status?.text_color,
          }}
          className="w-[100px] rounded-xs py-1 px-2 text-center"
        >
          <p className="text-white">{order.order_details?.[0].status || order.order_status?.name}</p>
        </button>
      )
    },
    {
      title: "Total",
      render: (order: OrderResponse) => `${order.total_amount === 0 ? "NaN" : "Nrs." + order.total_amount}`,
    },
    {
      title: "Action",
      render: (order: OrderResponse) => (
        <div className="flex justify-end w-full h-full gap-2">
          {/* <button className="cursor-pointer text-primary"
            onClick={() => router.push(`/order-tracking`)}>
            Track
          </button> */}
          <button
            className="cursor-pointer text-primary"
            onClick={() => router.push(`/my_orders/${order.id}`)}
          >
            Manage
          </button>
        </div>
      ),
    },
  ];
};
