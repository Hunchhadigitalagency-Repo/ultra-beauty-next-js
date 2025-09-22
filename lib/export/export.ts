import { ETypes } from "@/types/table";
import { toast } from "sonner";
import api from "@/services/api-instance";
import { IOrder } from "@/types/orders";
// import { dummyOrders } from "./dummy-order";

const convertToCSV = (data: any[], headers: string[]) => {
  const csvRows = [];
  csvRows.push(headers.join(","));

  data?.forEach((item) => {
    const row = headers.map((header) => {
      let val = item[header];
      if (val === null || val === undefined) val = "";
      if (typeof val === "string" && (val.includes(",") || val.includes('"'))) {
        val = `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    });
    csvRows.push(row.join(","));
  });

  return csvRows.join("\n");
};

export const exportCSV = async (type: ETypes) => {
  try {
    let data: any[] = [];
    let headers: string[] = [];

    switch (type) {
      case ETypes.ORDERS:
        const datas: { data: { results: IOrder[] } } = await api.get('/order-dropdown/');

        const orders = datas?.data.results;

        data = orders?.map((order) => ({
          OrderID: order.id,
          CustomerName: order.user.username || "-", // fallback to username
          Email: order.user.email || "-",
          TotalAmount: order.total_amount ?? 0, // use ?? to allow 0
          PaymentStatus: order.payment_status || "-",
          OrderStatus: order.order_status?.name || "-",
          OrderDate: order.order_created || "-",
        }));


        headers = [
          "OrderID",
          "CustomerName",
          "Email",
          "TotalAmount",
          "PaymentStatus",
          "OrderStatus",
          "OrderDate",
        ];
        break;

      case ETypes.INVENTORY:
        const inventoryRes = await fetch(`/api/inventory/export`);
        const inventory = await inventoryRes.json();

        data = inventory.map((item: any) => ({
          ProductName: item.product.name,
          SKU: item.product.sku,
          Category: item.product.category || "",
          Quantity: item.quantity,
          ActionType: item.action,
        }));

        headers = ["ProductName", "SKU", "Category", "Quantity", "ActionType"];
        break;

      default:
        toast.error("Unsupported export type");
        return;
    }

    // Convert to CSV
    const csvString = convertToCSV(data, headers);

    // Trigger download
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${type}-export-${new Date().toISOString()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Export successful!");
  } catch (err) {
    console.error(err);
    toast.error("Export failed, please try again!");
  }
};
