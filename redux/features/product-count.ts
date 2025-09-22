import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Counts {
  total: number;
  available: number;
  disabled: number;
  featured: number;
  general_coupon_count: number;
  influencer_coupon_count: number;
  total_coupon_count: number;
}

const initialState: { count: Counts } = {
  count: {
    total: 0,
    available: 0,
    disabled: 0,
    featured: 0,
    general_coupon_count: 0,
    influencer_coupon_count: 0,
    total_coupon_count: 0,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCounts(state, action: PayloadAction<Partial<Counts>>) {
      state.count = { ...state.count, ...action.payload };
    },
  },
});

export const { setCounts } = productsSlice.actions;
export default productsSlice.reducer;
