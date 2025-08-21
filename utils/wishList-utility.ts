import { createWishList, deleteWishlist } from "@/lib/api/wishlist/wishlist-apis";
import { decreaseWishlistCount, increaseWishlistCount } from "@/redux/features/wishList-slice";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

export const toggleWishlist = async (
    slug: string | undefined,
    isWishlisted: boolean | undefined,
    isAuthenticated: boolean,
    router: AppRouterInstance,
    dispatch: any
) => {
    if (!slug)
        return;

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