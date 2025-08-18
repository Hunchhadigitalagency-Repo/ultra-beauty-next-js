import api from "@/services/api-instance";
import { AuthenticatedAuthProfile } from "@/types/profile";

export const updateMyProfile = async ( data: Partial<AuthenticatedAuthProfile>) => {
    const response = await api.put(`auth/profile`, data);
    return response;
}