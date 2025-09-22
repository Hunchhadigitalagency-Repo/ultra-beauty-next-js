import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICriteria {
  brands?: number[];
  categories?: number[];
  colors?: string[];
  priceRange?: [number, number];
  status?: string;
  grand_total?: number;
  customer_name?: string;
  email?: string;
  start_date?: string;
  end_date?: string;
  order_id?: string;
  order_status?: string;
  attributes?: number[];
  subcategories?: number[];
  inventories?: number[];
  action_type?: string;
}

type HomeState = {
  searchQuery: string;
  criteria: ICriteria;
};

const initialState = {
  searchQuery: "",
  criteria: {} as ICriteria,
} as HomeState;

export const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCriteria: (state, action) => {
      state.criteria = action.payload;
    },
    clearSearchQuery: (state) => {
      state.searchQuery = "";
    },
    clearAllFilters: (state) => {
      state.searchQuery = "";
      state.criteria = {};
    },
  },
});

export const {
  setSearchQuery,
  setCriteria,
  clearSearchQuery,
  clearAllFilters,
} = filter.actions;
export default filter.reducer;
