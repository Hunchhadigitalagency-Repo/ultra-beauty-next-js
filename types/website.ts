import { IFeature } from "./product";


export interface NavigationItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  children?: { name: string; href: string }[];
}
export interface IRecommendation {
  id: number;
  name: string;
  specialty: string;
  institution: string;
  imageSrc: string;
}

export type SocialPlatform = "facebook" | "instagram" | "twitter" | "linkedin";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface ITeamCard {
  id: number;
  name: string;
  position: string;
  image: string;
  description: string;
  socialLinks?: SocialLink[];
}

export interface BlogCardProps {
  id: number;
  title: string;
  sub_title: string;
  author: { id: number; username: string | null };
  category: { id: number; name: string; is_active: boolean };
  cover_image: string;
  created_at: string;
  description: string;
}


export interface ProductImage {
  id: number;
  file: string;
  file_type: string;
  is_primary: boolean;
  created_at: string;
}

export interface Inventory {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  sku: string;
  slug_name: string;
  detail_description: string;
  general_description: string;
  discount_percentage: string;
  is_flash_sale: boolean;
  flash_end_date: string | null;
  flash_sale_discount: string | null;
  images: ProductImage[];
  inventory: Inventory;
  is_Featured: boolean;
  is_must_sold: boolean;
  is_new: boolean;
  is_published: boolean;
  is_tax_applicable: boolean;
  brand: string;
  category: {
    id: number;
    name: string;
  };
  subcategory: any;
  tutorial: any;
  quantity: number | null;
  package: any;
  youtube_link: string;
  created_at: string;
  updated_at: string;
  variants: any[];
}

