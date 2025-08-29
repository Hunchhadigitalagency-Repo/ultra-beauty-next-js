// type Items = {
//   image: string;
//   description: string;
// };

// export type OrderResponse = {
//   id: number;
//   orderNumber: string;
//   orderDate: string;
//   items: Items[];
//   status: string;
//   quantity: number;
//   total: number;
// };

export type ReviewCardProps = {
  image: string;
  description: string;
};

export interface ReviewModalProps {
  title: string;
  image: string;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  description: string;
}

export interface ReviewHistoryCardProps {
  image: string;
  product: string;
  rating: number;
  review: string;
}

export interface AuthProfileResponse {
  username: string;
  bio: string;
  email: string;
  profile_picture?: string | File;
  phone_number: any;
  first_name: string;
  last_name: string;
  address: any;
  is_verified: boolean;
  display_name: any;
  google_id: any;
  google_avatar: any;
  user_type: string;
}

export type RecentOrdersResponseWithPagination = {
  links: Links
  count: number
  page_size: number
  total_pages: number
  current_page: number
  results: OrderResponse[]
}

export type Links = {
  next: any
  previous: any
}

export type OrderResponse = {
  id: number
  user_id: number
  order_status: OrderStatus
  coupon: any
  order_created: string
  payment_method: string
  discount_amount: number
  sub_total: number
  total_amount: number
  shipping_fee: any
  payment_status: string
  user: User
  invoice_id: any
  has_invoice: boolean
  shipping_info: ShippingInfo
  order_details: any[]
}

export type OrderStatus = {
  id: number
  name: string
  is_active: boolean
  is_type_success: boolean
  is_type_failed: boolean
  position: number
  primary_color: string
  text_color: string
}

export type User = {
  id: number
  username: string
  email: string
  address: string
  phone_number: string
  profile_picture: string
}

export type ShippingInfo = {
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
  order_id: number
}