import { StaticImageData } from "next/image";
import { ReviewsResponse } from "./reviews";
import { IPaginatedDropdownData } from "./dropdown";

export interface IFeature {
  label: string;
  position: string;
}

export interface ProductVariant {
  id: number;
  item_name: string;
  item_price: string;
  item_quantity: string;
  item_image: string;
  sku: string;
  product_variants: any[];
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Inventory {
  id: number;
  name: string;
}

export interface IProductImage {
  id: number;
  file: string;
  file_type: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface IProduct {
  id: number;
  variants: ProductVariant[];
  images: IProductImage[];
  category: Category;
  subcategory: Category | null;
  inventory: Inventory;
  name: string;
  sku: string;
  quantity: string | null;
  general_description: string;
  detail_description: string;
  brand: string;
  price: string;
  discount_percentage: string;
  flash_end_date: string | null;
  flash_sale_discount: string | null;
  is_flash_sale: boolean;
  slug_name: string;
  is_published: boolean;
  is_Featured: boolean;
  is_new: boolean;
  is_must_sold: boolean;
  is_tax_applicable: boolean;
  tutorial: string | null;
  youtube_link: string;
  created_at: string;
  updated_at: string;
  package: any[] | null;
  my_wishlist: boolean;
  average_rating: number;
  sold_unit: number
}
export interface CategoryFilter {
  id: number;
  name: string;
  product_count: number;
}

export interface SubcategoryFilter {
  id: number;
  name: string;
  category_id: number;
  product_count: number;
}

export interface PriceRangeFilter {
  min_price: number;
  max_price: number;
}

interface InventoryFilter extends CategoryFilter { }
interface BrandFilter extends CategoryFilter { }
export interface IProductFilter {
  categories: CategoryFilter[];
  subcategories: SubcategoryFilter[];
  inventories: InventoryFilter[];
  brands: BrandFilter[];
  price_range: PriceRangeFilter;
  // Replace `any` with actual attribute type if known
}



// Tejasvi Types Here

export interface ProductCardProps {
  // id: number;
  slug?: string;
  imageSrc: string;
  alt: string;
  isFlashSale?: boolean;
  title: string;
  rating: number;
  price: string;
  discountTag?: string;
  onAddToCart?: () => void;
  onToggleWishlist?: (slug: string | undefined, isWishlisted: boolean | undefined) => void;
  isWishlisted?: boolean;
  quantity?: number;
  brand?: string;
}

export interface ProductResponse {
  links: Links
  count: number
  page_size: number
  total_pages: number
  current_page: number
  results: Result[]
}

export interface Links {
  next: any
  previous: any
}

export interface Result {
  variants: Variant[]
  images: ProductImagesResponse[]
  category: Category
  tax_applied: Tax | null
  brand: Brand
  subcategory: any
  inventory: any
  my_wishlist: boolean
  reviews: ReviewsResponse[]
  average_rating: number
  total_reviews: number
  name: string
  sku: string
  quantity: number
  general_description: string
  detail_description: string | undefined
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
  package: any[]
}

export interface Variant {
  id: number
  item_name: string
  item_price: string
  item_quantity: number
  item_image: any
  sku: string
  product_variants: ProductVariant[]
  created_at: string
  updated_at: string
}

export interface ProductVariant {
  id: number
  attribute: Attribute
  attribute_variant: AttributeVariant
  created_at: string
  updated_at: string
}

export interface Attribute {
  id: number
  name: string
}

export interface AttributeVariant {
  id: number
  name: string
}

export interface ProductImagesResponse {
  id: number
  file: string
  file_type: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
}
export type Tax = {
  id: number;
  name: string;
  tax_percentage: number;
}
export interface Link {
  next: string;
  previous: string;
}

export interface MyBrand {
  id: number
  brand_name: string
  brand_image: string
  description?: string
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  is_deleted: boolean
}
export interface BrandResponse {
  links: Link;
  count: number;
  page_size: number;
  total_pages: number;
  current_page: number;
  results: MyBrand[]
}

export interface Brand {
  id: number
  name: string
  brand_image: string
  description?: string
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  is_deleted: boolean
}

// Single Product Page Types
export interface SingleProductResponse extends Result {
  id: number
}
export interface SingleProductPageProps {
  product: SingleProductResponse;
}

export interface SelectedAttribute {
  name: string;
  value: string;
};

export interface ErrorState {
  [attributeName: string]: string | null;
};

export interface ProductImagesSectionProps {
  images: ProductImagesResponse[];
  description: string | undefined;
  is_flash_sale?: boolean;
  flashEndDate?: string;
  isWishlisted?: boolean;
  is_new?: boolean;
  onToggleWishlist: () => void;
}

export interface TimeLeftProps {
  hours: number,
  minutes: number,
  seconds: number
}

export interface TopSelling {
  product_name: string;
  price: number;
  available_stock: number;
  image_url: string;
  total_quantity_sold: number;
  total_earning: number;
}

export interface IVariantAttribute {
  id: number;
  attribute: { id: number; name: string };
  attribute_variant: { id: number; name: string };
  updated_at: string;
}

interface IProductVariant {
  id: number;
  item_name: string;
  item_price: string;
  item_quantity: number;
  item_image: string | null;
  sku: string;
  product_variants: IVariantAttribute[];
  created_at: string;
  updated_at: string;
}

interface ProductImage {
  id: number;
  file: string;
  file_type: string;
  created_at: string;
  updated_at: string;
}

interface IProductDropdown {
  id: number;
  name: string;
}
export interface IDashboardProduct {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  general_description: string;
  detail_description: string;
  price: string;
  discount_percentage: string;
  flash_end_date: Date;
  flash_sale_discount: string | null;
  is_flash_sale: boolean;
  slug_name: string;
  is_published: boolean;
  is_Featured: boolean;
  is_new: boolean;
  is_must_sold: boolean;
  is_tax_applicable: boolean;
  is_best_seller: boolean;
  tutorial: string | null;
  youtube_link: string;
  created_at: string;
  updated_at: string;
  average_rating: number;
  total_reviews: number;
  my_wishlist: boolean;
  package: IPaginatedDropdownData[];
  variants: IProductVariant[];
  images: ProductImage[];
  category: IProductDropdown;
  subcategory: IProductDropdown | null;
  brand: IProductDropdown;
  tax_applied: {
    id: string;
    name: string;
    tax_percentage: number;
  } | null;
  inventory: IProductDropdown;
  same_as_parent_name: boolean;
  attribute_price: boolean;
  attribute_discount: boolean;
  attribute_image: boolean;
  sold_unit: number;
}

interface ProductVariantDetails {
  item_name: string;
  item_price: string;
  item_quantity: string;
  sku: string;
  item_image: string | null;
  product_variants: ProductVariant[];
}

interface ProductDetails {
  id: number;
  name: string;
  slug_name: string;
  image: string | null;
  sku: string;
  category: {
    name: string;
    id: number;
  };
}
export interface InventoryProducts {
  id: number;
  product: ProductDetails;
  product_variant: ProductVariantDetails;
  quantity: number;
  action: string;
  attachment: string | null;
  created_at: string;
  last_updated: string;
  action_by: {
    first_name: string;
    last_name: string;
    profile: {
      user_type: string;
    };
  };
}