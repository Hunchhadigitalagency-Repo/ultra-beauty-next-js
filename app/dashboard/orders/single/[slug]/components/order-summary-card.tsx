import { IOrders } from "@/types/orders";
import UserInfoCard from "./user-info-card";

interface SummaryCardProps {
  title: string;
  topRightLabel?: string;
  data: IOrders;
}

function OrderSummaryCard({ title, topRightLabel, data }: SummaryCardProps) {
  console.log(data)
  let orderDetailsData;

  if (title === "Order Details") {
    orderDetailsData = [
      { label: "SUB-TOTAL", value: `Nrs. ${data.sub_total}` },
      {
        label: "DISCOUNT",
        value: `Nrs. ${data.discount_amount}`,
      },
      { label: "SHIPPING CHARGE", value: `Nrs. ${data.shipping_fee || "0"}` },
      { label: "TAX", value: "Nrs. 0" },
      {
        label: "COUPON DISCOUNT",
        value: `Nrs. ${data.coupon_discount}`,
      },
      { label: "TOTAL", value: `Nrs. ${data.total_amount}` },
    ];
  } else if (title === "Payment Info") {
    orderDetailsData = [
      { label: "TOTAL", value: `Nrs. ${data.total_amount}` },
      { label: "MODE", value: data.payment_method },
    ];
  }

  return (
    <section className="flex flex-col gap-2 h-full">
      <div className="bg-white rounded-lg p-6 border ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {topRightLabel && (
            <span className="text-sm text-foreground">{topRightLabel}</span>
          )}
        </div>

        <div className="space-y-4 divide-y divide-gray-200">
          {orderDetailsData?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-blast:border-b-0"
            >
              <span className="text-sm font-medium text-foreground uppercase tracking-wide">
                {item.label}
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {item.value}
              </span>
            </div>
          ))
          }

        </div>
      </div>
      {
        title === "Payment Info" && (
          <div className="bg-white rounded-lg p-6 border h-1/2 ">
            <UserInfoCard userInfoData={data} />
          </div>
        )
      }
    </section>
  );
}

export default OrderSummaryCard;
