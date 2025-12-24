"use client";
import InvoiceHeader from "./components/invoice-header";
import InvoiceDetailsSection from "./components/invoice-details-section";
import InvoiceSummary from "./components/invoice-summary";
import { TransactionDetailsCard } from "./components/transaction-details-card";
import InvoiceProductsList from "./components/invoice-products-list";
import useFetchData from "@/hooks/use-fetch-data";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/components/common/loader/loading-spinner";

import { Invoice } from "@/types/invoices";
import Image from "next/image";
import { IBill, ICompanyProfile } from "@/types/Settings";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { setSelectedData } from "@/redux/features/authentication-slice";

const SingleInvoiceDetailsPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { data, isLoading } = useFetchData<Invoice>(
    `/invoices/${params.slug}/`
  );

  useEffect(() => {
    dispatch(setSelectedData(data));
  }, [dispatch, data]);

  const { data: billings, isLoading: logoLoding } =
    useFetchData<IBill[]>("/bill-details/");
  const { data: companyProfile, isLoading: comapnyLoading } =
    useFetchData<ICompanyProfile>("/company-profiledropdown/");
  if (isLoading || logoLoding || comapnyLoading) {
    return <LoadingSpinner />;
  }

  if (!data) {
    return (
      <p className="text-center py-10 text-red-600">
        Failed to fetch invoice details.
      </p>
    );
  }
  const paidAmount = data.transactions.reduce(
    (acc, trans) => acc + parseInt(trans.amount || "0"),
    0
  );
  
  return (
    <main className="min-h-screen space-y-6 bg-white">
      {/* Heading */}

      <section
        id="printable-invoice"
        className="bg-white rounded-lg p-6 relative overflow-hidden "
      >
        {billings && billings.length > 0 && billings[0].logo && (
          <>
            <div className="absolute inset-0 flex mt-10 items-center justify-center pointer-events-none z-0">
              <Image
                src={billings[0].logo}
                height={400}
                width={400}
                alt="BASERA Watermark"
                className="opacity-10 select-none object-contain"
              />
            </div>
          </>
        )}
      
        <InvoiceHeader invoiceId={data.id} status={data.status} canRecordTrans={data.amount.toString() === paidAmount.toString()} />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center uppercase tracking-wide mb-6 border-b-4 border-primary pb-2">
          Proforma Invoice
        </h1>

        <InvoiceDetailsSection {...data} billing={billings?.[0]} />
        <InvoiceProductsList data={data?.order?.order_details} />
        <InvoiceSummary {...data} />
      </section>

      <div className="grid grid-cols-1 gap-6 p-4 bg-white">
        {data?.transactions.length > 0 && (
          <>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Transaction Details
            </h2>
            <hr className="-my-2 py-0" />
            {data?.transactions.length > 0 &&
              data?.transactions?.map((transaction, index) => (
                <TransactionDetailsCard key={index} transaction={transaction} />
              ))}
          </>
        )}
      </div>
    </main>
  );
};

export default SingleInvoiceDetailsPage;
