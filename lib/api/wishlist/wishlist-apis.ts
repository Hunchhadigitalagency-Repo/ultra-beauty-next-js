import api from "@/services/api-instance"

export const createWishList = async (products: number) => {
    const product_ids = [products]
    const response = await api.post('/wishlists/', { product_ids })
    return response;
}

export const deleteWishlist = async (productId: number) => {
    const response = await api.delete("/wishlists/", {
        data: {
            product_ids: [productId],
        },
    });
    return response;
};
