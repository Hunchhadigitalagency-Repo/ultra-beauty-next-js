// import { PurchaseFormValues } from "@/schemas/inventory/purchase-schema"
import api from "@/services/api-instance";
// import { PurchaseReturnFormValues } from "@/schemas/inventory/purchase-return-schema"
// import { MultiProductFormValues } from "@/app/dashboard/inventory/purchase/purchase-inventory-form"
// import { damageReturnFormValues } from "@/schemas/inventory/damage-schema"
// import { EditInventoryFormValues } from "@/schemas/inventory/edit-inventory-shcema"


export const purchaseAdd = async (data: any) => {
    // console.log("this is the data", data)
    const response = await api.post('/inventory-purchase/', data)
    return response
}


export const purchaseReturn = async (data: FormData) => {
    const response = await api.post('/inventory-purchase-return/', data)
    return response
}

export const damageReturn = async (data: FormData) => {
    const response = await api.post('/inventory-damage/', data)
    return response
}

export const updatedInventory = async (id: string, data: any, action: string) => {
    const response = await api.patch(`/inventory-${action}/${id}/`, data)
    return response;
}

export const deleteInventoryData = async (id: number, action: string) => {
    const response = await api.delete(`/inventory-${action}/${id}/`)
    return response
}