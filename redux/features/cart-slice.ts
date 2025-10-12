import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShippingFormValues } from "@/schemas/checkout/checkout-schema";
import { CartItem, CartSelectionState, VoucherItem } from "@/types/cart";


const initialState: CartSelectionState = {
    cartCount: 0,
    cartItem: [],
    shippingDetails: null,
    voucherData: null,
    orderId: null,
    shippingFee: ''
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.cartItem = action.payload
        },
        toggleCartItem: (state, action: PayloadAction<CartItem>) => {
            console.log('toggling cart items');

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

        updateSelectedCartItem: (state, action) => {
            const { id, quantity, price } = action.payload;
            const existing = state.cartItem.find(item => item.id === id);
            if (existing) {
                existing.quantity = quantity;
                existing.price = price;
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
        },
        setShippingFee: (state, action: PayloadAction<string>) => {
            state.shippingFee = action.payload
        },
        increaseCartCount: (state) => {
            state.cartCount = state.cartCount + 1;
        },
        decreaseCartCount: (state) => {
            if (state.cartCount > 0) {
                state.cartCount -= 1;
            }
        },
        setCartCount: (state, action: PayloadAction<number>) => {
            state.cartCount = action.payload
        },
        decreaseCartCountBy: (state, action: PayloadAction<number>) => {
            state.cartCount = state.cartCount - action.payload;
        },
        clearCartCount: (state) => {
            state.cartCount = 0;
        }
    },
});

export const {
    setCartItems,
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
    setOrderId,
    increaseCartCount,
    decreaseCartCount,
    clearCartCount,
    decreaseCartCountBy,
    setCartCount,
    setShippingFee,
    updateSelectedCartItem
} = cartSlice.actions;

export default cartSlice.reducer;