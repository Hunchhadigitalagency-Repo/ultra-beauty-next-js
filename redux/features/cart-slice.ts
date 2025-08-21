import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShippingFormValues } from "@/schemas/checkout/checkout-schema";
import { CartItem, CartSelectionState, VoucherItem } from "@/types/cart";

const initialState: CartSelectionState = {
    cartItem: [],
    shippingDetails: null,
    voucherData: null,
    orderId: null
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        toggleCartItem: (state, action: PayloadAction<CartItem>) => {
            const existingIndex = state.cartItem.findIndex(item => item.id === action.payload.id);
            if (existingIndex >= 0) {
                state.cartItem.splice(existingIndex, 1);
            } else {
                state.cartItem.push(action.payload);
            }
        },

        toggleAllCartItems: (state, action: PayloadAction<CartItem[]>) => {
            const allItemsPresent = action.payload.every(newItem =>
                state.cartItem.some(existingItem => existingItem.id === newItem.id)
            );

            if (allItemsPresent) {
                state.cartItem = state.cartItem.filter(
                    existingItem => !action.payload.some(newItem => newItem.id === existingItem.id)
                );
            } else {
                action.payload.forEach(newItem => {
                    if (!state.cartItem.some(existingItem => existingItem.id === newItem.id)) {
                        state.cartItem.push(newItem);
                    }
                });
            }
        },

        updateCartItemQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.cartItem.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },

        deleteCartItem: (state, action: PayloadAction<number>) => {
            state.cartItem = state.cartItem.filter(item => item.id !== action.payload);
        },

        deleteAllCartItem: (state) => {
            state.cartItem = [];
        },

        addShippingDetails: (state, action: PayloadAction<ShippingFormValues | null>) => {
            state.shippingDetails = action.payload
        },

        setVoucherData: (state, action: PayloadAction<VoucherItem | null>) => {
            state.voucherData = action.payload
        },
        setOrderId: (state, action: PayloadAction<number | null>) => {
            state.orderId = action.payload;
        },
        clearCartItems: (state) => {
            state.cartItem = [];
        },
        clearVoucherData: (state) => {
            state.voucherData = null;
        },
        clearCart: (state) => {
            state.cartItem = [];
            state.shippingDetails = null;
            state.voucherData = null;
        }
    },
});

export const {
    toggleCartItem,
    toggleAllCartItems,
    deleteCartItem,
    deleteAllCartItem,
    updateCartItemQuantity,
    addShippingDetails,
    setVoucherData,
    clearCart,
    clearCartItems,
    clearVoucherData,
    setOrderId
} = cartSlice.actions;

export default cartSlice.reducer;
