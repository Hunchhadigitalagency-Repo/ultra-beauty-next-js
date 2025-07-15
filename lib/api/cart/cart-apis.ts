import api from "@/services/api-instance"


export const addToCart = async (product: number, quantity: number) => {
    const response = await api.post("/carts/", { product, quantity })
    return response;
}