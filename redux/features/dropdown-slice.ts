import { IOrderStatus } from "@/types/Settings";
import { createSlice } from "@reduxjs/toolkit";

type HomeState = {
  orderStatusDropdown: IOrderStatus[];
};

const initialState = {
  orderStatusDropdown: [],
} as HomeState;

export const dropdown = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    setOrderStatusDropdown: (state, action) => {
      state.orderStatusDropdown = action.payload;
    },
  },
});

export const { setOrderStatusDropdown } = dropdown.actions;

export default dropdown.reducer;
