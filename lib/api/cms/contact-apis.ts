import api from "@/services/api-instance";


export const updateContact = async (id: number, status: string) => {
    const response = api.patch(`/cms/contactus/${id}/`, { status });
    return response
}