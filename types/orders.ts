import { StaticImageData } from "next/image";
import { ProductVariant } from "./product";
import { PaginatedResponse } from "@/types/common";

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

export interface IOrderDetail {
  id: number;
  order: number;
  product: IProduct;
  product_variant: IProductVariant;
  quantity: number;
  price: number;
  total_price: number;
  status: "pending" | "Delivered" | "Packed" | "Placed" | "Shipped" | string;
}

export interface IProduct {
  id: number;
  image: string;
  name: string;
  sku: string;
  quantity: number;
  general_description: string;
  detail_description: string;
  price: string;
  discount_percentage: string;
  flash_end_date: string;
  flash_sale_discount: string;
  is_flash_sale: boolean;
  slug_name: string;
  is_published: boolean;
  is_Featured: boolean;
  is_new: boolean;
  is_must_sold: boolean;
  is_tax_applicable: boolean;
  tutorial: string | null;
  youtube_link: string | null;
  created_at: string;
  updated_at: string;
  brand: number;
  tax_applied: string | null;
  package: any[];
}

export interface IProductVariant {
  id: number;
  item_name: string;
  item_price: string;
  item_quantity: number;
  item_image: string;
  sku: string;
  product_variants: IVariantAttribute[];
  created_at: string;
  updated_at: string;
}

export interface IVariantAttribute {
  id: number;
  attribute_id: number;
  attribute: string;
  attribute_variant_id: number;
  attribute_variant: string;
  created_at: string;
  updated_at: string;
}

export interface IOrderResponse {
  id: number;
  user_id: number;
  order_status: {
    id: number;
    name: string;
    is_active: boolean;
    is_type_success: boolean;
    is_type_failed: boolean;
    position: number;
    primary_color: string;
    text_color: string;
  };
  order_created: string;
  payment_method: string;
  sub_total: number;
  total_amount: number;
  shipping_fee: number | null;
  payment_status: "pending" | "paid" | "failed" | string;
  user: {
    id: number;
    username: string;
    email: string;
    address: string | null;
    phone_number: string | null;
    profile_picture: string;
  };
  shipping_info: IShippingInfo;
  order_details: IOrderDetail[];
}

export interface IShippingInfo {
  id: number;
  first_name: string;
  last_name: string;
  phone_no: string;
  alternate_phone_no: string;
  email: string;
  address: string;
  city: string;
  province: string;
  landmark: string;
  building: string;
  order_id: number;
}

// Order-details-0------------------------------------------------------------------------------------------
export interface CreateOrderResponse {

  id: number
  user: User
  payment_method: string
  payment_status: string
  order_status: OrderStatus
  order_created: string
  sub_total: string
  discount_amount: string
  tax_amount: string
  shipping_fee: string
  coupon_discount: string
  total_amount: string
  shipping_info: ShippingInfo
  order_details: OrderDetail[]

}

export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
}

export interface OrderStatus {
  id: number
  name: string
  position: number
  is_active: boolean
}

export interface ShippingInfo {
  id: number
  first_name: string
  last_name: string
  phone_no: string
  alternate_phone_no: string
  email: string
  address: string
  city: string
  province: string
  landmark: string
  building: string
}

export interface OrderDetail {
  id: number
  image: StaticImageData | string,
  product: Product
  product_variant: any
  quantity: number
  price: string
  discount_amount: string
  vat_amount: string
  total_price: string
  name: string
  detail_description: string
  status: string
}

export interface Product {
  id: number
  image: string
  name: string
  sku: string
  quantity: number
  general_description: string
  detail_description: string
  price: string
  discount_percentage: string
  flash_end_date: string
  flash_sale_discount: string
  is_flash_sale: boolean
  slug_name: string
  is_published: boolean
  is_Featured: boolean
  is_new: boolean
  is_best_seller: boolean
  is_tax_applicable: boolean
  tutorial: any
  youtube_link: string
  created_at: string
  updated_at: string
  same_as_parent_name: boolean
  attribute_price: boolean
  attribute_discount: boolean
  attribute_image: boolean
  brand: number
  tax_applied: number
  package: number[]
}

export interface CancelResultResponse {
  order_id: number;
  order_created: string;
  product: Product;
  product_variant: ProductVariant;
  quantity: number;
  status: string;
  price: string;
  discount_amount: string;
  vat_amount: string;
  total_price: string
}
export interface CancelOrderResponse extends PaginatedResponse {
  results: CancelResultResponse[]
}

// order details end------------------------------------------------------------------------------