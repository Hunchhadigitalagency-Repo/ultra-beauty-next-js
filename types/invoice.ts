export interface IInvoice {
  id: number;
  customerName: string;
  order_id: string | number;
  total: number;
  invoiceDate: string;
  status: string;
}
