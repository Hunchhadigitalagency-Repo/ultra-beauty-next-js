import { createSlice } from "@reduxjs/toolkit";

interface NavbarState {
    wishlistCount: number;
}

const initialState: NavbarState = {
    wishlistCount: 0,
};

const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        increaseWishlistCount: (state) => {
            state.wishlistCount = state.wishlistCount + 1;
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
} = navbarSlice.actions;

export default navbarSlice.reducer;
