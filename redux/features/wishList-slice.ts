import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavbarState {
  wishlistCount: number;
  notificationCount: number;
}

const initialState: NavbarState = {
  wishlistCount: 0,
  notificationCount: 0,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setWishlistCount: (state, action: PayloadAction<number>) => {
      state.wishlistCount = action.payload;
    },
    increaseWishlistCount: (state) => {
      state.wishlistCount = state.wishlistCount + 1;
    },
    setNotificationCount: (state, action) => {
      state.notificationCount = action.payload;
    },
    decreaseWishlistCount: (state) => {
      if (state.wishlistCount > 0) {
        state.wishlistCount = state.wishlistCount - 1;
      }
    },
  },
});

export const {
  increaseWishlistCount,
  decreaseWishlistCount,
  setNotificationCount,
  setWishlistCount,
} = navbarSlice.actions;

export default navbarSlice.reducer;
