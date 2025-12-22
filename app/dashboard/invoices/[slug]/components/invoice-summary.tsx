import { Invoice } from "@/types/invoices";

export default function InvoiceSummary({ order }: Invoice) {
  return (
    <div className="flex justify-end mb-8 relative z-10">
      <div className="w-full md:w-1/2 lg:w-1/3 text-sm text-gray-700">
        <div className="grid grid-cols-2 gap-y-2 py-2 border-b border-gray-200">
          <span className="font-medium">Total</span>
          <span className="text-right">Nrs. {order?.sub_total}</span>
        </div>
        <div className="grid grid-cols-2 gap-y-2 py-2 border-b border-gray-200">
          <span className="font-medium">Discount</span>
          <span className="text-right">Nrs. {order?.discount_amount ?? 0}</span>
        </div>
        {
          order.coupon_discount &&
        <div className="grid grid-cols-2 gap-y-2 py-2 border-b border-gray-200">
          <span className="font-medium">Coupon Discount</span>
          <span className="text-right">Nrs. {order?.coupon_discount ?? 0}</span>
        </div>
        }
        {
          order.shipping_fee &&
        <div className="grid grid-cols-2 gap-y-2 py-2 border-b border-gray-200">
          <span className="font-medium">Shipping Fees</span>
          <span className="text-right">Nrs. {order?.shipping_fee ?? 0}</span>
        </div>
        }
       
        <div className="grid grid-cols-2 gap-y-2 py-2 border-b border-gray-200">
          <span className="font-medium">Vat 13%</span>
          <span className="text-right">Nrs. {order?.vat_amount ?? 0}</span>
        </div>
        <div className="grid grid-cols-2 gap-y-2 py-2 font-bold text-gray-800 text-base">
          <span>GRAND TOTAL</span>
          <span className="text-right">Nrs. {order?.total_amount}</span>
        </div>
      </div>
    </div>
  );
}
