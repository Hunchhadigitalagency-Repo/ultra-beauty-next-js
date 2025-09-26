import { Badge } from "@/components/ui/badge";
import InvoiceDetailItem from "./invoice-detail-item";
import { Invoice } from "@/types/invoices";

export default function InvoiceDetailsSection({ date, order, billing }: Invoice) {
  return (
    <section>
      <div className="flex items-center justify-between gap-4 p-2 border-t border-b border-[#E7E6E6] flex-wrap">
        <InvoiceDetailItem
          title={billing?.name || ""}
          value=""
        />
        <InvoiceDetailItem title="PAN Number" value={billing?.pan_number} />
      </div>
      <div className="flex items-center justify-between gap-4 p-2 border-t border-b border-[#E7E6E6] flex-wrap">
        <InvoiceDetailItem title="Invoice Date" value={date?.split("T")?.[0]} />
        <InvoiceDetailItem
          title="Customer Name"
          value={
            order?.shipping_info?.first_name +
            " " +
            order?.shipping_info?.last_name
          }
        />
      </div>


      <div className="flex items-center justify-between gap-4 p-2 border-t border-b border-[#E7E6E6] flex-wrap">
        <InvoiceDetailItem title="Order ID" value={order?.id} />
        <InvoiceDetailItem
          title="Address"
          value={order?.shipping_info?.address}
        />
      </div>

      <div className="flex items-center justify-between gap-4 p-2 border-t border-b border-[#E7E6E6] flex-wrap">
        <InvoiceDetailItem
          title="Payment Status"
          value={
            <Badge
              variant="outline"
              className="bg-green-100 text-green-700 border-green-300 capitalize w-fit"
            >
              {order?.payment_status}
            </Badge>
          }
        />
        <InvoiceDetailItem
          title="Contact Details"
          value={order?.shipping_info?.phone_no}
        />
      </div>
    </section>
  );
}
