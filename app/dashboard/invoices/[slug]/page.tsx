"use client";
import InvoiceHeader from "./components/invoice-header";
import InvoiceDetailsSection from "./components/invoice-details-section";
import InvoiceSummary from "./components/invoice-summary";
import { TransactionDetailsCard } from "./components/transaction-details-card";
import InvoiceProductsList from "./components/invoice-products-list";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/common/loader/loading-spinner";

import { Invoice } from "@/types/invoices";
import Image from "next/image";
import { IBill } from "@/types/Settings";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { setSelectedData } from "@/redux/features/authentication-slice";
import useFetchData from "@/hooks/use-fetch";

const SingleInvoiceDetailsPage = () => {

  const dispatch = useAppDispatch();
  const params = useParams();
  const { data, loading: isLoading } = useFetchData<Invoice>(
    `/invoices/${params.slug}/`, true
  );

  useEffect(() => {
    dispatch(setSelectedData(data))
  }, [dispatch, data])

  const { data: billings, loading: logoLoding } = useFetchData<IBill[]>('/bill-details/')
  if (isLoading || logoLoding) {
    return <LoadingSpinner />;
  }

  if (!data) {
    return (
      <p className="text-center py-10 text-red-600">
        Failed to fetch invoice details.
      </p>
    );
  }

  return (
    <main className="min-h-screen space-y-6 bg-gray-50">
      {/* Heading */}

      <section
        id="printable-invoice"
        className="bg-white rounded-lg p-6 relative overflow-hidden "
      >
        {billings && billings.length > 0 && billings[0].logo && (
          <div className="absolute inset-0 flex mt-10 items-center justify-center pointer-events-none z-0">
            <Image
              src={billings[0].logo}
              height={400}
              width={400}
              alt="BASERA Watermark"
              className="opacity-10 select-none object-contain"
            />
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center uppercase tracking-wide mb-6 border-b-4 border-primary pb-2">
          Proforma Invoice
        </h1>

        <InvoiceHeader invoiceId={data.id} status={data.status} />
        <InvoiceDetailsSection {...data} billing={billings?.[0]} />
        <InvoiceProductsList data={data?.order?.order_details} />
        <InvoiceSummary {...data} />
      </section>

      <div className="grid grid-cols-1 gap-6">
        {data?.transactions.length > 0 &&
          <>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Transaction Details
            </h2>
            {data?.transactions.length > 0 && data?.transactions?.map((transaction, index) => (
              <TransactionDetailsCard key={index} transaction={transaction} />
            ))}
          </>

        }
      </div>
    </main>

  );
};

export default SingleInvoiceDetailsPage;