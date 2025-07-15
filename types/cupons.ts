export interface ICoupon {
  id: number;
  coupon_type: string;
  name: string;
  code: string;
  discount_percentage: number;
  products: string[];
  categories: string;
  subcategories: string;
  commission_percentage?: number;
  withdrawal_limit?: number;
  _influencers?: string[];
  title?: string;
  subtitle?: string;
  image?: string;
  expiry_date?: string;
  is_active: boolean;
}
