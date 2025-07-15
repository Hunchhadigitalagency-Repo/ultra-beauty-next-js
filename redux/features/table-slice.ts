import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TableState {
  selectedIds: number[];
  refetch: boolean;
}

const initialState: TableState = {
  selectedIds: [],
  refetch: false,
  
};

export const table = createSlice({
  name: "table",
  initialState,
  reducers: {
    selectItems: (state, action: PayloadAction<number[]>) => {
      state.selectedIds = action.payload;
    },
    addSelectedItem: (state, action: PayloadAction<number>) => {
      if (!state.selectedIds.includes(action.payload)) {
        state.selectedIds.push(action.payload);
      }
    },
    removeSelectedItem: (state, action: PayloadAction<number>) => {
      state.selectedIds = state.selectedIds.filter(
        (id) => id !== action.payload
      );
    },
    clearSelection: (state) => {
      state.selectedIds = [];
    },
    toggleSelectAll: (state, action: PayloadAction<number[]>) => {
      const allSelected = action.payload.every((id) =>
        state.selectedIds.includes(id)
      );
      if (allSelected) {
        state.selectedIds = [];
      } else {
        state.selectedIds = action.payload;
      }
    },
    toggleRefetchTableData: (state) => {
    state.refetch = !state.refetch;
  },
  },

});

export const {
  selectItems,
  addSelectedItem,
  removeSelectedItem,
  clearSelection,
  toggleSelectAll,
  toggleRefetchTableData,
} = table.actions;

export default table.reducer;
