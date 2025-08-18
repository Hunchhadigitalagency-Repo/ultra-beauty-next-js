type Items = {
    image: string;
    description: string;
};

export type OrderResponse = {
    id: number;
    orderNumber: string;
    orderDate: string;
    items: Items[];
    status: string;
    quantity: number;
    total: number;
};

export type ReviewCardProps = {
    image: string;
    description: string;
}

export interface ReviewModalProps {
    title: string;
    image: string;
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    description:string;
}

export interface ReviewHistoryCardProps {
    image: string;
    product: string;
    rating: number;
    review: string
}

 export interface AuthenticatedAuthProfile {
  username: string
  bio: string
  email: string
  profile_picture: string | null
  phone_number: any
  first_name: string
  last_name: string
  address: any
  is_verified: boolean
  display_name: any
  google_id: any
  google_avatar: any
  user_type: string
}