import api from "@/services/api-instance"

export const createProduct = async (data: any) => {
    const response = await api.post('/products/', data);
    return response;
}

export const updateProduct = async (id: number | string, data: any) => {
    const response = await api.patch(`/products/${id}/`, data);
    return response;
}

export const deleteProduct = async (id: string | number) => {
    const response = await api.delete(`/products/${id}/`);
    return response;
}

export const deleteMultipleProducts = async (ids: number[] | string[]) => {
    const response = await api.delete(`/products/bulk/`, {
        data: ids
    });
    return response;
}

export const createProductAttribute = async (data: any) => {
    const response = await api.post("/product-attributes/", data);
    return response;
};

export const updateProductAttribute = async (id: number, data: any) => {
    const response = await api.patch(`/product-attributes/${id}/`, data);
    return response;
};
