import api from "@/services/api-instance";


export const createTeam = async (data: FormData) => {
    const response = await api.post('/cms/our-team/ ', data)
    return response;
}

export const updateTeam = async (id: number, data: FormData) => {
    const response = await api.patch(`/cms/our-team/${id}/`, data)
    return response;
}

export const deleteTeam = async (id: number) => {
    const respone = await api.delete(`/cms/our-team/${id}/`)
    return respone
}