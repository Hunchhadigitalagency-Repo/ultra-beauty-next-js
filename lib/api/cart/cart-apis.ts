import api from "@/services/api-instance"


export const addToCart = async (
    user: number,
    product: string,
    quantity: number,
    product_variant?: number
) => {
    const response = await api.post("/carts/", {
        user,
        product,
        quantity,
        product_variant,
    });
    return response;
};

export const updateCart = async (
    userId: number,
    product_slug: string,
    quantity: number,
    cartId: number
) => {
    const response = await api.patch(`/carts/${cartId}/`, {
        userId,
        product_slug,
        quantity,
    });
    return response;
};

export const deleteFromCart = async (id: number[] | number) => {
    const response = await api.delete("/carts/", {
        data: { ids: [id] },
    });
    return response;
};

export const deleteAllFromCart = async (id: number[]) => {
    const response = await api.delete("carts/", {
        data: {
            ids: id
        }
    });
    return response;
};

export const getCartItemsByIds = async (cart_ids: number[]) => {
    const response = await api.post("/carts/get-cart-details-by-ids/", {
        cart_ids
    });
    return response;
}

export const applyVoucher = async (code: string) => {
    
    const response = await api.post("/coupons/validate/", { code });
    return response;
};