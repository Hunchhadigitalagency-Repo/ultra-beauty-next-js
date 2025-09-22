import { RolesValues } from "@/schemas/settings/roles-schema";
import api from "@/services/api-instance";

export const createRolesandPermissions = async (data: RolesValues) => {
    const response = await api.post("/roles/create/", data);
    return response;
};

export const getSingleRolesPermissions = async (id: number) => {
    const response = await api.get(`/roles/${id}/`);
    return response;
};

export const updateRolesandPermissions = async (
    id: number,
    data: Partial<RolesValues>
) => {
    const response = await api.patch(`/roles/${id}/update/`, data);
    return response;
};

export const deleteRolesandPermissions = async (id: number) => {
    const response = await api.delete(`/roles/${id}/delete/`);
    return response;
};
