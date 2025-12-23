import { setCartCount,  } from "@/redux/features/cart-slice";
import { setNotificationCount } from "@/redux/features/wishList-slice";
import { AppDispatch } from "@/redux/store";
import api from "@/services/api-instance";

export const updateCartAndWishlistCounts = async (dispatch: AppDispatch) => {
  try {
    const [notificationRes, cartRes] = await Promise.all([
      api.get("/cms/notifications-views/"),
      api.get("/carts"),
    ]);

    const unreadNotificationCount =
      notificationRes?.data?.filter(
        (not: any) => not.is_viewed === false
      ).length || 0;

    const cartCount = cartRes?.data?.results?.length || 0;

    dispatch(setCartCount(cartCount));
    dispatch(setNotificationCount(unreadNotificationCount));
  } catch (error) {
    console.error("Error fetching cart or notification count:", error);
  }
};
