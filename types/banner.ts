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

export interface BannerResponse {
  id: number
  image: string
  product_slug: string
  is_active: boolean
  position: string
}