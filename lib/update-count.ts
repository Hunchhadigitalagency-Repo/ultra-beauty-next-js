import { setCartCount } from "@/redux/features/cart-slice";
import { setNotificationCount } from "@/redux/features/wishList-slice";
import { AppDispatch } from "@/redux/store";
import apiBase from "@/services/api-base-instance";

export const updateCartAndWishlistCounts = async (
  dispatch: AppDispatch,
  accessToken: string
) => {
  console.log("it has been called");
  if (!accessToken) return;
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
    console.log(notificationRes);

    const unreadNotificationCount =
      notificationRes?.data?.filter((not: any) => not.is_viewed === false)
        .length || 0;
    console.log(unreadNotificationCount);

    const cartCount = cartRes?.data?.results?.length || 0;

    dispatch(setCartCount(cartCount));
    dispatch(setNotificationCount(unreadNotificationCount));
  } catch (error) {
    console.error("Error fetching cart or notification count:", error);
  }
};
