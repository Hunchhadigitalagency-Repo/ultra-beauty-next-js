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
      render: (order: OrderResponse) => {
        if (!order.order_created) return "N/A";

        const date = new Date(order.order_created);
        const year = date.getFullYear();
        const onlyLastTwoDigitsOfYear = year.toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;

        return `${month}/${day}/${onlyLastTwoDigitsOfYear}, ${hours}:${minutes} ${ampm}`;
      },
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
        <p
          className={`text-white py-2 flex items-center justify-center w-24 rounded-md ${(() => {
            switch (order.order_status.name.toLowerCase()) {
              case 'delivered': return 'bg-green';
              case 'cancelled': return 'bg-red';
              case 'returned': return 'bg-orange';
              default: return 'bg-yellow';
            }
          })()
            }`}
        >
          {order.order_status.name}
        </p>
      ),
    },

    {
      title: "Total",
      render: (order: OrderResponse) => `${order.total_amount === 0 ? "NaN" : "Nrs." + order.total_amount}`,
    },
    {
      title: "Action",
      render: (order: OrderResponse) => (
        <button
          className="cursor-pointer text-primary"
          onClick={() => router.push(`/my_orders/${order.id}`)}
        >
          Manage
        </button>
      ),
    },
  ];
};
