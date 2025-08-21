import api from "@/services/api-instance";

export const createWishList = async (products: string | undefined) => {
    const product_slugs = [products];
    const response = await api.post("/wishlists/", { product_slugs });
    return response;
}

export const deleteWishlist = async (productId: string | undefined) => {
    const response = await api.delete("/wishlists/", {
        data: {
            product_slugs: [productId],
        },
    });
    return response;
};
export const deleteAllWishlist = async () => {
    const response = await api.delete("/wishlists/");
    return response;
};