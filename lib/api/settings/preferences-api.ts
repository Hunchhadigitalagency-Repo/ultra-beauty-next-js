import api from "@/services/api-instance";

export const createPreferences = async (data: {
    theme_name: string;
    is_active: boolean;
    colors: { color_name: string; color_value: string }[];
}) => {
    const response = await api.post("/themes/", data);
    return response;
};

export const updatePreferences = async (
    id: number,
    data: {
        theme_name?: string;
        is_active?: boolean;
        colors?: { color_name: string; color_value: string }[];
    }
) => {
    const response = await api.patch(`/themes/${id}/`, data);
    return response;
};

export const deletePreferences = async (id: number) => {
    const response = await api.delete(`/themes/${id}/`);
    return response;
};
