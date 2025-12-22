import { InvoiceTransaction } from "@/types/invoices";
import InvoiceDetailItem from "./invoice-detail-item";
// import Link from "next/link";

interface TransactionDetailsCardProps {
  transaction: InvoiceTransaction;
}

export function TransactionDetailsCard({
  transaction,
}: TransactionDetailsCardProps) {

  const hasTransactionDetails =
    transaction.transaction_details &&
    Object.keys(transaction.transaction_details).length > 0
  return (
    <section className="bg-white rounded-lg px-4 py-2">
      <div className="flex items-center justify-between gap-4 p-4 border-[#E7E6E6]">
        <InvoiceDetailItem title="Transaction id" value={transaction.id} />
        {/* <Link
          className="text-primary text-sm hover:underline hover:underline-offset-4"
          href={`/dashboard/invoices/${transaction.id}`}
        >
          Go to Detail
        </Link> */}
      </div>

      <div className="flex items-center justify-between gap-4 p-4 border-t border-b border-[#E7E6E6] flex-wrap">
        <InvoiceDetailItem title="Transaction Date" value={new Date(transaction.date).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        } />
        <InvoiceDetailItem
          title="Transaction Amount"
          value={transaction.amount}
        />
        <InvoiceDetailItem
          title="Transaction Made Via"
          value={transaction.mode}
        />
      </div>

      {hasTransactionDetails && (
        <div className="flex items-center justify-between gap-4 p-4 border-t border-b border-[#E7E6E6] flex-wrap">
          <h3 className="font-semibold text-sm text-foreground mb-2">
            Online Transaction Details
          </h3>
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-b border-[#E7E6E6]">
            <InvoiceDetailItem
              title="Transaction Code"
              value={transaction.transaction_details.transaction_code}
            />
            <InvoiceDetailItem
              title="Transaction Status"
              value={transaction.transaction_details.payment_status}
            />
            <InvoiceDetailItem
              title="Transaction Amount"
              value={transaction.transaction_details.total_amount}
            />
          </div>
        </div>
      )}
      {!transaction.transaction_details && (
        <div className="p-4  ">
          <h3 className="font-semibold text-foreground mb-2 text-sm">
            Online Transaction Details
          </h3>
          <p className="text-sm text-gray-500">-</p>
        </div>
      )}
    </section>
  );
}
