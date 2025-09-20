import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialStateType {
    selectedCategories: number[];
    selectedSubcategories: number[];
    selectedBrands: number[];
}

const initialState: InitialStateType = {
    selectedCategories: [],
    selectedSubcategories: [],
    selectedBrands: []
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        toggleCategory: (state, action: PayloadAction<{ id: number; checked: boolean }>) => {
            const { id, checked } = action.payload;
            if (checked) {
                state.selectedCategories.push(id);
            } else {
                state.selectedCategories = state.selectedCategories.filter(v => v !== id);
            }
        },
        toggleSubcategory: (state, action: PayloadAction<{ id: number; checked: boolean }>) => {
            const { id, checked } = action.payload;
            if (checked) {
                state.selectedSubcategories.push(id);
            } else {
                state.selectedSubcategories = state.selectedSubcategories.filter(v => v !== id);
            }
        },
        toggleBrands: (state, action: PayloadAction<{ id: number, checked: boolean }>) => {
            const { id, checked } = action.payload;
            if (checked) {
                state.selectedBrands.push(id);
            } else {
                state.selectedBrands = state.selectedBrands.filter(v => v !== id)
            }
        },
        clearSubcategoriesForCategory: (state, action: PayloadAction<number[]>) => {
            state.selectedSubcategories = state.selectedSubcategories.filter(
                subId => !action.payload.includes(subId)
            );
        },
        resetFilters: () => initialState,
    }
});

export const {
    toggleCategory,
    toggleSubcategory,
    toggleBrands,
    clearSubcategoriesForCategory,
    resetFilters
} = categorySlice.actions;

export default categorySlice.reducer;