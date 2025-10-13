import React from "react";

import { Button } from "@/components/ui/button";
import DataCard from "@/components/common/cards/data-card";
import CustomTable from "@/components/common/table/custom-table";
import { SingleOrderConstant } from "./single-order-constant";
import HeaderBackCard from "@/components/common/cards/header-back-card";
import { IOrders } from "@/types/orders";
import { createInvoice } from "@/lib/api/invoices/invoice-api";
import { handleError } from "@/lib/error-handler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import OrderStatusDropdown from "../../../components/order-status-dropdown";

const SingleOrderTable = ({
  orderData,
  loading,
  refetch
}: {
  orderData: IOrders;
  loading: boolean;
  refetch: () => void;
}) => {
  const router = useRouter();

  const handleCreateInvoice = async () => {
    try {
      const response = await createInvoice(orderData.id);
      toast.success("Invoice created successfully");
      router.push(`/dashboard/invoices/${response.data.id}`);
    } catch (error) {
      handleError(error, toast);
    }
  };

  const handleInvoiceClick = () => {
    router.push(`/dashboard/invoices/${orderData.invoice_id}`);
  };

  // console.log("this is order ata and incoide ", orderData)

  return (
    <DataCard
      filter={
        <div className="flex flex-wrap gap-4  w-full items-center justify-between">
          <HeaderBackCard
            title={`Order Number: ${orderData.id}`}
            fallBackLink="/dashboard/orders"
          />
          <div className="flex items-center gap-2">
            <OrderStatusDropdown
              orderId={orderData.id}
              currentStatus={orderData.order_status}
              refetch={refetch}
            />

            <Button
              className="rounded-sm"
              onClick={
                orderData.has_invoice ? handleInvoiceClick : handleCreateInvoice
              }
            >
              Invoice
            </Button>
          </div>
        </div>
      }
    >
      <CustomTable
        cols={SingleOrderConstant()}
        data={orderData.order_details}
        loading={loading}
      />
    </DataCard>
  );
};

export default SingleOrderTable;
