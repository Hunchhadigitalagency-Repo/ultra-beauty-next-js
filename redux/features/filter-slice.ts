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

interface Attribute {
  id: number;
  data: string[]
}

type HomeState = {
  searchQuery: string;
  criteria: ICriteria;
  attribute: Attribute[]
};

const initialState = {
  searchQuery: "",
  criteria: {} as ICriteria,
  attribute: [],
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
    setAttribute: (state, action) => {
      const { id, data } = action.payload;

      const dataArray = Array.isArray(data) ? data : [data];

      const existingAttribute = state.attribute.find((attr) => attr.id === id);

      if (existingAttribute) {
        const uniqueValues = Array.from(new Set([...existingAttribute.data, ...dataArray]));
        existingAttribute.data = uniqueValues;
      } else {
        state.attribute.push({
          id,
          data: dataArray,
        });
      }
    },

    deleteAtt: (state, action) => {
      const { id, data } = action.payload;

      if (!data) {
        state.attribute = state.attribute.filter((att) => att.id !== id);
      } else {
        state.attribute = state.attribute
          .map((att) => {
            if (att.id === id) {
              return {
                ...att,
                data: att.data.filter((item) => item !== data),
              };
            }
            return att;
          })
          .filter((att) => att.data.length > 0);
      }
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
  setAttribute,
  deleteAtt
} = filter.actions;
export default filter.reducer;
