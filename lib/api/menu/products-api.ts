import api from "@/services/api-instance"

export const createProduct = async (data: any) => {
    const response = await api.post('/products/', data);
    return response;
}

export const updateProduct = async (id: number, data: any) => {
    const response = await api.put(`/products/${id}`, data);
    return response;
}

export const deleteProduct = async (id: number) => {
    const response = await api.delete(`/products/${id}`);
    return response;
}

export const deleteMultipleProducts = async (ids: number[]) => {
    const response = await api.delete(`/products/bulk`, {
        data: ids
    });
    return response;
}