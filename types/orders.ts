export interface IOrderItem {
  id: number;
  imageUrl: string;
  name: string;
  sku: string;
  price: string;
  quantity: number;
  total: string;
  size: string;
  color: string;
  status: "Delivered" | "Packed" | "Placed" | "Shipped";
}
