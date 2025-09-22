import api from "@/services/api-instance";

export const createCareer = async (data: FormData) => {
    const response = await api.post("/cms/career/", data);
    return response;
};

export const updateCareer = async (id: string, data: FormData) => {
    const response = await api.patch(`/cms/career/${id}/`, data);
    return response;
};

export const deleteCareer = async (id: string) => {
    const response = await api.delete(`/cms/career/${id}/`);
    return response;
};
