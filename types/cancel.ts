// components/seed/types.ts

import { ProductVariant } from "./product";

export interface Variety {
  weight: string;
  color: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export type ActionStatus = "Requested" | "Accepted";

export interface CancelRequest {
  id: number;
  productName: string;
  productImage: string;
  order_detail_info: {
    quantity: string;
    product: {
      name: string;
      images: {
        id: number;
        file: string;
        file_type: string;
        created_at: string;
      }[];
    };
    product_variant: {
      product_variants: {
        id: number;
        attribute: {
          id: number;
          name: string;
        };
        attribute_variant: {
          id: number;
          name: string;
        };
      }[];
    };
  };
  quantity: number;
  product_variants: ProductVariant[];
  user: User;
  status: ActionStatus;
  orderId: string;
  invoiceId: string;
  reason: string;
  description: string;
  shipping_info: {
    first_name: string;
    last_name: string;
    phone_no: string;
    address: string;
  };
}

export type ICancelProducts = {
  id: number;
  order_id: number;
  product: {
    name: string;
    slug_name: string;
    images: string[];
    quantity: number;
    general_description: string;
    detail_description: string;
    price: string;
    discount_percentage: string | null;
    flash_end_date: string;
    flash_sale_discount: string | null;
    is_flash_sale: boolean;
    is_published: boolean;
    is_Featured: boolean;
    is_new: boolean;
    is_best_seller: boolean;
    is_tax_applicable: boolean;
    tutorial: string | null;
    youtube_link: string;
    created_at: string;
    updated_at: string;
    brand: string;
    is_tax_applied: boolean | null;
    package: string;
  };
  product_variant: number | null;
  quantity: number;
  price: string;
  status: "cancelled" | "pending" | "shipped" | "delivered" | string;
  reason: string | null;
  additional_info: string | null;
};

export interface ReturnRequest extends CancelRequest {}
