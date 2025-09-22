import api from "@/services/api-instance";

export const createHelpSupport = async (data: FormData) => {
    const response = await api.post("/help-and-support/", data);
    return response;
};

export const updateHelpSupport = async (id: number, data: FormData) => {
    const response = await api.patch(`/help-and-support/${id}/`, data);
    return response;
};

export const deleteHelpSupport = async (id: number) => {
    const response = await api.delete(`/help-and-support/${id}/`);
    return response;
};
