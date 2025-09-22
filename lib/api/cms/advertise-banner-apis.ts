import api from "@/services/api-instance"



export const addAdvertiseBanner = async (data: FormData) => {
    const response = await api.post('/cms/advertisment-banners/', data)
    return response;
}


export const updateAdvertiseBanner = async (id: number | string, data: FormData) => {
    const response = await api.patch(`/cms/advertisment-banners/${id}/`, data)
    return response;
}

export const deleteAdvertiseBanner = async (id: number | string) => {
    const response = await api.delete(`/cms/advertisment-banners/${id}/`)
    return response;
}