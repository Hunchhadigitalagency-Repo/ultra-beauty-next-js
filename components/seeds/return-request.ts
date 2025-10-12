import useFetchData from "@/hooks/use-fetch";
import { CancelRequest, ActionStatus } from "@/types/cancel";

export function useReturnRequests() {
  const { data, loading: isLoading, error } = useFetchData<any>("/return-items/", true);

  const returnRequest: CancelRequest[] =
    data?.map((item: CancelRequest, i: number) => {
      const firstProduct = item.order_detail_info?.product;
      const productImage = firstProduct?.images[0]?.file;
      const product_variant = item.order_detail_info?.product_variant;

      return {
        id: item.id,
        productName: firstProduct?.name || "Unnamed Product",
        productImage,
        quantity: item.order_detail_info?.quantity || 1,
        product_variants: product_variant?.product_variants,
        shipping_info: {
          first_name: item?.shipping_info?.first_name,
          last_name: item?.shipping_info?.last_name,
          address: item?.shipping_info?.address,
          phone_no: item?.shipping_info?.phone_no,
        },
        status: (item.status || "Requested") as ActionStatus,

        orderId: `#${item.id}`,
        invoiceId: `#INV_${800 + i}`,
        reason: item.reason || "",
      };
    }) || [];

  return { returnRequest, isLoading, error };
}
