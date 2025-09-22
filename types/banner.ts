import { IPaginatedDropdownData } from "./dropdown";
export interface IBanner {
  id: number;
  banner_type: string;
  title: string;
  image: string;
  subtitle?: string;
  product?: string;
  discount_percentage: number;
  expiry_datetime?: string;
  products?: string;
  category?: string;
  sub_category?: string;
  is_active: boolean;
}

export interface Product {
  id: number;
  image: string;
  name: string;
  slug_name: string;
}
export interface BannerResponse {
  id: number
  image: string
  is_active: boolean
  position: string
  product: Product
}

export interface IDashboardBanner {
  id: number;
  banner_type: string;
  title: string;
  image: string;
  subtitle?: string;
  product?: IPaginatedDropdownData;
  discount_percentage: number;
  expiry_datetime?: string;
  products?: string;
  category?: string;
  sub_category?: string;
  is_active: boolean;
  page?: string;
}