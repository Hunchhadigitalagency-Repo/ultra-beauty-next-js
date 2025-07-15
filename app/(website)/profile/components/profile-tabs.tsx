import MyCancellations from "./MyCancellation/my-cancellations";
import MyOrders from "./my-orders";
import MyProfile from "./MyProfile/my-profile";
import MyReturns from "./my-returns";
import ReviewHistory from "./MyReview/components/review-history";
import ToBeReviewed from "./MyReview/components/to-be-reviewed";
import MyReviews from "./MyReview/my-reviews";
import MyTestimonials from "./my-testimonials";
import MyWishlist from "./my-wishlist";

type Tab = {
    name: string;
    component: React.ReactNode;
};

export const PROFILE_TABS: Tab[] = [
    { name: 'Profile', component: <MyProfile /> },
    { name: 'My Orders', component: <MyOrders /> },
    { name: 'My Returns', component: <MyReturns /> },
    { name: 'My Reviews', component: <MyReviews /> },
    { name: 'My Cancellation', component: <MyCancellations /> },
    { name: 'My Wishlist', component: <MyWishlist /> },
    { name: 'Testimonial', component: <MyTestimonials /> },
];


export const REVIEW_TABS = [
    { name: 'To Be Reviewed', component: <ToBeReviewed /> },
    { name: 'Review History', component: <ReviewHistory /> },
]