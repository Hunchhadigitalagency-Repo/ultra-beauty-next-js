import { OrderResponse } from "@/types/profile";
import { Col } from "@/types/table";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const MyOrderConstants = (): Col<OrderResponse>[] => {
  const router = useRouter();

  return [
    {
      title: "Order Number",
      render: (order: OrderResponse) => order.orderNumber,
    },
    {
      title: "Order Date",
      render: (order: OrderResponse) => order.orderDate,
    },
    {
      title: "Items",
      render: (order: OrderResponse) => (
        <div className="flex gap-2 items-center">
          {order.items.slice(0, 3).map((item, index) => (
            <div key={index}>
              <div className="relative w-10 h-10">
                <Image
                  src={item.image}
                  alt=""
                  className="object-cover rounded-sm"
                  layout="fill"
                />
              </div>
            </div>
          ))}
          {order.items.length > 3 && <span>+{order.items.length - 3}</span>}
        </div>
      ),
    },
    {
      title: "Total",
      render: (order: OrderResponse) => `$${order.total}`,
    },
    {
      title: "Action",
      render: () => (
        <button
          className="text-primary cursor-pointer"
          onClick={() => router.push("/my_orders")}
        >
          Manage
        </button>
      ),
    },
  ];
};
