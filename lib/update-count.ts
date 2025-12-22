import { setCartCount } from "@/redux/features/cart-slice";
import { AppDispatch } from "@/redux/store";

import api from "@/services/api-instance";

export const updateCartAndWishlistCounts = async (dispatch: AppDispatch) => {
  try {
    const [_, cartRes] = await Promise.all([
      api.get("/wishlists"),
      api.get("/carts"),
    ]);


    const cartCount = cartRes?.data?.results?.length || 0;
    dispatch(setCartCount(cartCount));
  } catch (error) {
    console.error("Error fetching wishlist or cart count:", error);
  }
};
