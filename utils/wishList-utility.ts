import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { createWishList, deleteWishlist } from "@/lib/api/wishlist/wishlist-apis";
import { decreaseWishlistCount, increaseWishlistCount } from "@/redux/features/wishList-slice";
export const useToggleWishlist = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    return async (slug?: string, isWishlisted?: boolean, isAuthenticated?: boolean) => {
        if (!slug) return;
        if (!isAuthenticated) {
            router.push("/login");
            return;
        }
        try {
            if (isWishlisted) {
                await deleteWishlist(slug);
                toast.success("Item removed from wishlist");
                dispatch(decreaseWishlistCount());
            } else {
                await createWishList(slug);
                toast.success("Product added to wishlist");
                dispatch(increaseWishlistCount());
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update wishlist");
        }
    };
};