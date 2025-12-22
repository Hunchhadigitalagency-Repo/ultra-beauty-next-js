import { ShippingFormValues } from "@/schemas/checkout/checkout-schema";
import { Links, Result, Tax, Variant } from "./product";

export interface CartItems {
  id: number;
  quantity: number;
  price: string;
  currentPrice?: string;
  discount_percentage?: string;
  tax_applied: null;
  selected?: any;
}

export interface CartResponse {
  links: Links;
  count: number;
  page_size: number;
  total_pages: number;
  current_page: number;
  results: CartResultType[];
}

export interface CartResultType {
  id: number;
  user: string;
  product: CartResult;
  product_variant: Variant;
  quantity: number;
  added_at: string;
  is_flash_sale?: boolean;
  flash_sale_discount?: string;
}

interface CartResult extends Result {
  id: number;
  image: string;
}

export interface CartItemCardProps {
  item: CartResultType;
  onRemove: (id: number) => void;
  refetch: () => void;
}

export interface LocationCardProps {
  location: string;
}

// Cart Slice Types

export interface CartItem {
  id: number;
  image: string;
  name: string;
  quantity: number;
  price: string;
  discount_percentage?: string;
  tax_applied: Tax | null;
  is_flash_sale?: boolean;
  flash_sale_discount?: string;
}
export interface Coupon {
  code: string;
  discount_percentage: string;
}
export interface VoucherItem {
  coupon: Coupon;
}
export interface CartSelectionState {
  cartCount: number;
  cartItem: CartItem[];
  shippingDetails: ShippingFormValues | null;
  voucherData: VoucherItem | null;
  orderId: number | null;
  shippingFee: string;
}

// Shipping Details Types

export interface ShippingLocation {
  name?: string;
  phoneNumbers?: string[];
  address?: string;
  fulladress?: string;
}
export interface OrderSummaryProps {
  tax?: number;
  totalItems: number;
  shippingFee: number;
  shippingDetails: ShippingFormValues | null;
  voucherCode?: string;
  onVoucherCodeChange?: (code: string) => void;
  onApplyVoucher?: () => void;
  isCheckout?: boolean;
  applyVoucher?: boolean;
}
