"use client";

import CommentForm from "./components/comment-form";
import OrderSummaryCard from "./components/order-summary-card";
import OrdersTable from "./components/order-table-single";
import ShippingCardDetails from "./components/shipping-card-details";
import UserInfoCard from "./components/user-info-card";

const orderDetailsData = [
  { label: "SUB-TOTAL", value: "Nrs. 25648" },
  { label: "DISCOUNT", value: "Nrs. 245" },
  { label: "SHIPPING CHARGE", value: "Nrs. 170" },
  { label: "TAX", value: "Nrs. 150" },
  { label: "TOTAL", value: "Nrs. 254869" },
];

const paymentInfoData = [
  { label: "TOTAL", value: "Nrs. 254869" },
  { label: "MODE", value: "ESEWA" },
  { label: "NUMBER", value: "9824386694" },
  { label: "DATE", value: "2025/02/03" },
  { label: "TIME", value: "12:50 AM" },
];

const userInfoData = {
  imageUrl: "https://randomuser.me/api/portraits/men/75.jpg",
  info: [
    {
      label: "NAME",
      value: "Hemanta Jung Karki",
    },
    {
      label: "EMAIL",
      value: "hemantajungkarki@gmail.com",
    },
    {
      label: "PHONE",
      value: "9824386944",
    },
    {
      label: "ADDRESS",
      value: "Itahari, Sunasari, Nepal",
    },
  ],
};

const shippingDetailsData = [
  { label: "Name", value: "Ram Bahadur Karki Chetteri" },
  {
    label: "Address",
    value:
      "Itahari 1 Sunsari Nepal Opposite to Gorkah Kiitchen in ride side of the street",
  },
  { label: "Phone", value: "9824386694" },
  { label: "Alternative Phone", value: "9819330828" },
  { label: "Province", value: "Bagmati" },
  { label: "City", value: "Itahari" },
  { label: "Landmark", value: "Gorkaha Department Store opposite" },
  { label: "Building/Floor", value: "AKM building 5th floor" },
  { label: "Email", value: "hemantajungkarki@gmail.com" },
  { label: "Location", value: "HOME" },
];

const SingleOrderPage = () => {
  return (
    <main className="space-y-4">
      <OrdersTable />
      <div className="grid xl:grid-cols-5 gap-4">
        <section className=" col-span-3 space-y-4">
          <aside className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <OrderSummaryCard title="Order Details" data={orderDetailsData} />

            <OrderSummaryCard
              title="Payment Info"
              topRightLabel="TNX ID: #245"
              data={paymentInfoData}
            />
          </aside>
          <aside className=" bg-white p-4 rounded-sm flex justify-between items-start gap-6 flex-wrap md:flex-nowrap shadow-sm">
            <UserInfoCard userInfoData={userInfoData} />
          </aside>
        </section>

        <section className="bg-[#FFF6E8] w-full p-6 rounded-sm  col-span-2 shadow-sm">
          <ShippingCardDetails shippingDetailsData={shippingDetailsData} />
        </section>
      </div>

      <CommentForm initialData={null} />
    </main>
  );
};

export default SingleOrderPage;
