"use client";

import OrderTable from "./components/order-table";
import PageHeader from "@/components/common/header/page-header";
import { ETypes } from "@/types/table";
import { withPermissions } from "@/hoc/withPermissions";
import { Permissions } from "@/types/permissions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportCSV } from "@/lib/export/export";
import { toast } from "sonner";

const OrdersPage = () => {
  const [dataLength, setDataLength] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false); // loading state

  const getDatalength = (length: number) => {
    setDataLength(length);
  };

  const handleExport = async () => {
    try {
      setLoading(true);
      await exportCSV(ETypes.ORDERS);
    } catch (err) {
      toast.error(`Export failed!: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const exportButton = (
    <Button
      variant="outline"
      className="text-black-500 border-black-500 bg-white hover:bg-black-100"
      onClick={handleExport}
      disabled={loading}
    >
      <Download className={`w-4 h-4 mr-2  ${loading && "animate-spin"}`} />
      {loading ? "Exporting..." : "Export"}
    </Button>
  );
  return (
    <main className="space-y-4 bg-white p-4">
      <PageHeader
        type={ETypes.ORDERS}
        totalItems={dataLength}
        searchPlaceholder="Search by Order ID"
        path="/dashboard/orders/add-orders"
        buttonText="Create Order"
        pageType={ETypes.ORDERS}
        hasBulkActions={true}
        customButton={
          <div className="flex gap-2">
            {exportButton}
          </div>
        }
      />

      <OrderTable setDatalength={getDatalength} />
    </main>
  );
};

export default withPermissions(OrdersPage, [Permissions.CAN_READ_ORDERS]);
