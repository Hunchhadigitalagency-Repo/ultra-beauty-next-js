import { IOrders } from "./orders";
import { IBill } from "./Settings";

export interface InvoiceTransaction {
  id: number;
  invoice_id: number;
  amount: string;
  date: string;
  transaction_details: {
    total_amount: number;
    payment_status: string;
    transaction_code: string;
    transaction_uuid: string;
  };
  status: string;
  mode: string;
  remarks: string;
}

export interface Invoice {
  billing?: IBill
  id: number;
  order: IOrders;
  amount: number;
  date: string;
  status: string;
  transactions: InvoiceTransaction[];
}
