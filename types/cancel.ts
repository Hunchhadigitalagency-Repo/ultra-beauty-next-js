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
  order: {
    id: number;
    user_id: number;
    order_status: {
      id: number;
      name: string;
    };
    order_created: string; // ISO date string
    payment_method: string;
    payment_status: string;
    discount_amount: string;
    sub_total: string;
    total_amount: string;
    shipping_fee: string;
    order_details: Array<{
      id: number;
      product: {
        name: string;
        slug_name: string;
        images: string[];
        quantity: number;
        general_description: string;
        detail_description: string;
        price: string;
        discount_percentage: string;
        flash_end_date: string;
        flash_sale_discount: string | null;
        is_flash_sale: boolean;
        is_published: boolean;
        is_Featured: boolean;
        is_new: boolean;
        is_best_seller: boolean;
        is_tax_applicable: boolean;
        tutorial: string;
        youtube_link: string;
        created_at: string;
        updated_at: string;
        brand: string;
        is_tax_applied: boolean | null;
        package: string;
      };
      product_variant: number | null;
      quantity: number;
      variant_image: string | null;
      variant_name: string | null;
      price: string;
      discount_amount: string;
      vat_amount: string | null;
      total_price: string;
      status: string;
    }>;
    shipping_info: {
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
    };
  };
  reason: string;
  additional_info: string;
  created_at: string;
}

export interface IReturnProducts {
  id: number;
  order_id: number;
  order_detail_id: number;
  status: "pending" | "approved" | "requested" | string;
  created_at: string;
  reason: string;
  additional_info: string;
  attachment: string | null;
  quantity: number;
  order_detail_info: {
    id: number;
    product: {
      id: number;
      name: string;
      sku: string;
      quantity: number;
      general_description: string;
      detail_description: string;
      images: string[]
      price: string;
      discount_percentage: string;
      flash_end_date: string;
      flash_sale_discount: string | null;
      is_flash_sale: boolean;
      slug_name: string;
      is_published: boolean;
      is_Featured: boolean;
      is_new: boolean;
      is_best_seller: boolean;
      is_tax_applicable: boolean;
      tutorial: string;
      youtube_link: string;
      created_at: string;
      updated_at: string;
      same_as_parent_name: boolean;
      attribute_price: boolean;
      attribute_discount: boolean;
      attribute_image: boolean;
      is_deleted: boolean;
      brand: number;
      tax_applied: number | null;
      package: number[];
    };
    product_variant: {
      id: number;
      item_name: string;
      item_price: string;
      item_quantity: number;
      item_image: string | null;
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
        created_at: string;
        updated_at: string;
      }[];
      created_at: string;
      updated_at: string;
    } | null;
    quantity: number;
    price: string;
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
