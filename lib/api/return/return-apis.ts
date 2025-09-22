import api from "@/services/api-instance"

export const updateReturnStatus = async (status: string, id: number) => {
    const response = api.patch(`/return-items/${id}/`, { status })
    return response
}