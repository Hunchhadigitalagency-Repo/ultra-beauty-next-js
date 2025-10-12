import useFetchData from "@/hooks/use-fetch";
import { CancelRequest, ActionStatus } from "@/types/cancel";


export function useCancelRequests() {
  const { data, loading: isLoading, error } = useFetchData<any>("/cancel/order", true);

  const cancelRequests: CancelRequest[] = data?.map((item: any, i: number) => {
    const firstProduct = item.order.order_details[0]?.product;
    const productImage = firstProduct?.images?.[0];
    const product_variant = item.order.order_details[0]?.product_variant;

    return {
      id: item.id,
      productName: firstProduct?.name || "Unnamed Product",
      productImage,
      quantity: item.order.order_details[0]?.quantity || 1,
      product_variants: product_variant?.product_variants,
      user: {
        name: `${item.order?.shipping_info?.first_name} ${item.order?.shipping_info?.last_name}`,
        email: item.order?.shipping_info?.email || "",
        avatar: productImage,
      },
      status: (item.order?.order_status?.name || "Requested") as ActionStatus,

      orderId: `#${item.order.id}`,
      invoiceId: `#INV_${800 + i}`,
      reason: item.reason || "",
      description: item.additional_info || "",
    };
  }) || [];
console.log('this is cencel reruqet', cancelRequests);

  return { cancelRequests, isLoading, error };
}
