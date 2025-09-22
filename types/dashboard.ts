
export interface DonutChartItem {
  name: string;
  value: number;
  color?: string;
}

export interface Status {
  id: number
  name: string
  is_active: boolean
  is_type_success: boolean
  is_type_failed: boolean
  position: number
  primary_color: string
  text_color: string
}
export interface NewOrderResponse {
  order_id: number
  total_amount: string
  status: Status
  customer: string
  payment_method: string
  order_date: string
}

export interface TopSellingProduct {
  product_name: string
  price: number
  available_stock: number
  image_url: string
  total_quantity_sold: number
  total_earning: number
}

export interface OrdersByCategoryResponse {
  category_order_counts: CategoryOrderCount[]
  total_product_count: number
  total_amount_sold: number
}

export interface CategoryOrderCount {
  category_id: number
  category_name: string
  product_order_count: number
  total_amount_sold: number
  percentage_of_total_products: number
}

export interface CardStats {
  key: string;
  value: number;
  percentage: number;
  indicator: string;
}