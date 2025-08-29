import { Coupon } from "@/types/cart";
import { store } from "@/redux/store";
import api from "@/services/api-instance";
import apiBase from "@/services/api-base-instance";
import { CreateOrderResponse, ShippingInfo } from "@/types/orders";

type ShippingRequest = Omit<ShippingInfo, 'id' | 'order_id'>;

interface AddOrderRequest {
    carts_id: number[],
    shipping_info: ShippingRequest | null,
    payment_method: string,
    coupon?: Coupon | null
}
export const addOrders = async ({ carts_id, payment_method, shipping_info, coupon }: AddOrderRequest) => {
    const response = await api.post<CreateOrderResponse>("/order/", {
        carts_id,
        shipping_info,
        payment_method,
        coupon,
    });
    return response;
};

export const updateOrder = async (
    orderId: number,
    status: number | string,
    total_amount?: number,
    transaction_code?: string,
    transaction_uuid?: string
) => {
    const response = await apiBase.patch(`/order/${orderId}/`, {
        payment_status: status,
        transaction_code,
        transaction_uuid,
        total_amount,
    }, {
        headers: {
            "Authorization": `Bearer ${store.getState().authentication.accessToken}`,
        },
    });
    return response;
};

export const cancelOrder = async (
    order_id: string,
    reason: string,
    additional_info: string
) => {
    const response = await api.post("/cancel/order/", {
        order_id,
        reason,
        additional_info,
    });
    return response;
};

export const cancelIndividualOrder = async (
    id: string,
    reason: string,
    additional_info: string
) => {
    const order_detail_ids = [id];
    const response = await api.post("/cancel-order-items/", {
        order_detail_ids,
        reason,
        additional_info,
    });
    return response;
};

export const returnOrder = async (
    order_id: number,
    order_detail_id: number,
    quantity: number,
    additional_info?: string,
    reason?: string,
    attachment?: File[]
) => {
    const formData = new FormData();
    formData.append("order_id", order_id.toString());
    formData.append("order_detail_id", order_detail_id.toString());
    formData.append("quantity", quantity.toString());
    if (additional_info) {
        formData.append("additional_info", additional_info);
    }
    if (reason) {
        formData.append("reason", reason);
    }
    if (attachment) {
        attachment.forEach((file) => {
            formData.append("attachment", file);
        });
    }
    const response = await api.post("return-items/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response
}