"use client";
import { useParams } from "next/navigation";

import { IOrders } from "@/types/orders";
import OrderSummaryCard from "./components/order-summary-card";

import ShippingCardDetails from "./components/shipping-card-details";
// import UserInfoCard from "./components/user-info-card";
import SingleOrderTable from "./components/single-order-table";
import LoadingSpinner from "@/components/common/loader/loading-spinner";
import useFetchData from "@/hooks/use-fetch";

const SingleOrderPage = () => {
  const params = useParams();

  const { data: order, loading: loading, refetch } = useFetchData<IOrders>(
    `/order/${params.slug}/`, true
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!order) {
    return (
      <p className="text-center py-10 text-red-600">
        Failed to fetch order details.
      </p>
    );
  }
  return (
    <main className="space-y-4">
      <SingleOrderTable orderData={order} loading={loading} refetch={refetch} />
      <div className="grid xl:grid-cols-5 gap-4">
        <section className=" col-span-3 space-y-4">
          <aside className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <OrderSummaryCard title="Order Details" data={order} />
            <OrderSummaryCard title="Payment Info" data={order} />

            <div className="w-full md:col-span-2">
              {/* <CommentForm initialData={null} order_slug={params.slug as string} /> */}
            </div>
          </aside>

          {/* <aside className=" bg-white p-4 rounded-sm flex justify-between items-start gap-6 flex-wrap md:flex-nowrap shadow-sm"> */}
          {/* <UserInfoCard userInfoData={order} /> */}
          {/* </aside> */}
        </section>

        <section className="bg-white w-full p-6 rounded-sm  col-span-2 shadow-sm">
          <ShippingCardDetails shippingDetailsData={order} />
        </section>
      </div>
    </main>
  );
};

export default SingleOrderPage;
