import { Result } from "./product"
import { User } from "./profile"

export interface ReviewsResponse {
    id: number;
    rating: number;
    review: string;
    created_at: string;
    updated_at: string;
    user: User;
    product: Result;
    picture: string;
}