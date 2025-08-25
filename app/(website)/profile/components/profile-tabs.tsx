import {
    LucideIcon,
    UserRoundPlus,
    ShoppingCart,
    Undo2,
    NotebookText,
    BookType,
    BookX
} from "lucide-react";
import MyOrders from "./my-orders";
import MyReturns from "./my-returns";
import MyReviews from "./MyReview/my-reviews";
import MyTestimonials from "./my-testimonials";
import MyProfile from "./MyProfile/my-profile";
import ToBeReviewed from "./MyReview/components/to-be-reviewed";
import MyCancellations from "./MyCancellation/my-cancellations";
import ReviewHistory from "./MyReview/components/review-history";

type Tab = {
    name: string;
    icon: LucideIcon
    component: React.ReactNode;
};

export const PROFILE_TABS: Tab[] = [
    { name: 'Profile', icon: UserRoundPlus, component: <MyProfile /> },
    { name: 'My Orders', icon: ShoppingCart, component: <MyOrders /> },
    { name: 'My Returns', icon: Undo2, component: <MyReturns /> },
    { name: 'My Reviews', icon: NotebookText, component: <MyReviews /> },
    { name: 'My Cancellation', icon: BookX, component: <MyCancellations /> },
    { name: 'Testimonial', icon: BookType, component: <MyTestimonials /> },
];


export const REVIEW_TABS = [
    { name: 'To Be Reviewed', component: <ToBeReviewed /> },
    { name: 'Review History', component: <ReviewHistory /> },
]