import { setCartCount } from "@/redux/features/cart-slice";
import { setNotificationCount } from "@/redux/features/wishList-slice";
import { useAppSelector } from "@/redux/hooks";
import { AppDispatch } from "@/redux/store";
import apiBase from "@/services/api-base-instance";

export const updateCartAndWishlistCounts = async (dispatch: AppDispatch) => {
  const { accessToken } = useAppSelector((state) => state.authentication);
  try {
    const [notificationRes, cartRes] = await Promise.all([
      apiBase.get("/cms/notifications-views/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      apiBase.get("/carts", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    ]);

    const unreadNotificationCount =
      notificationRes?.data?.filter((not: any) => not.is_viewed === false)
        .length || 0;

    const cartCount = cartRes?.data?.results?.length || 0;

    dispatch(setCartCount(cartCount));
    dispatch(setNotificationCount(unreadNotificationCount));
  } catch (error) {
    console.error("Error fetching cart or notification count:", error);
  }
};
