import { ShippingFormValues } from "@/schemas/checkout/checkout-schema";
import { CartItem } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Voucher {
    coupon: {
        code: string
        discount_percentage: number
    }
}

interface CheckOut {
    cart_ids: number[];
    voucher: Voucher | null;
    order_id: number | null;
    productItems: any;
    shippingInfo: ShippingFormValues | null;
    shippingFees: number | null;
}

const initialState: CheckOut = {
    cart_ids: [],
    voucher: null,
    order_id: null,
    productItems: [],
    shippingInfo: null,
    shippingFees: null,
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        setCartIds(state, action: PayloadAction<number[]>) {
            state.cart_ids = action.payload;
        },
        setVoucher(state, action: PayloadAction<any>) {
            state.voucher = action.payload;
        },
        setOrderId(state, action: PayloadAction<number | null>) {
            state.order_id = action.payload;
        },
        setProductItems: (state, action) => {
            state.productItems = action.payload
        }
        ,
        addProductItem: (state, action: any) => {
            const existingIndex = state.productItems.findIndex(
                (item: any) => item.slug === action.payload.slug
            );

            if (existingIndex !== -1) {
                state.productItems[existingIndex].quantity += action.payload.quantity;
                state.productItems[existingIndex].currentPrice += action.payload.currentPrice;
            } else {
                state.productItems.push(action.payload);
            }
        },

        deleteProductItem: (state, action) => {
            state.productItems = state.productItems?.filter(
                (item: any) => item.slug !== action.payload
            );
        },
        clearProduct: (state) => {
            state.productItems = []
        },
        setShippingInfo: (state, action) => {
            state.shippingInfo = action.payload;
        },
        setShippingFees: (state, action) => {
            state.shippingFees = action.payload
        },
        resetCheckout(state) {
            state.cart_ids = [];
            state.voucher = null;
            state.order_id = null;
            state.shippingInfo = null
            state.productItems = []
            state.shippingFees = null
        },
    },
});
export const {
    setCartIds,
    setVoucher,
    setOrderId,
    setShippingFees,
    resetCheckout,
    setProductItems,
    addProductItem,
    setShippingInfo,
    deleteProductItem,
    clearProduct
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
