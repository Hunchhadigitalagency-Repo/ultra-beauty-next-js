"use client";

import { useEffect, useState } from "react";
import CouponComponentHeader from "./coupon-component-header";
import CouponDetailPage from "./coupon-detail-accordion ";
import CouponSalesAnalyticsChart from "./coupon-sales-analytics";
import CouponStatsCardsSection from "./coupon-stat-card-section";
import CommissionDetailPage from "./comission-detail";
import CommissionWithdrawls from "./commission-withdrawls";
import api from "@/services/api-instance";

interface SingleCouponSectionProps {
  type: string;
  id: string;
}

interface CouponData {
  id: number;
  name: string;
  code: string;
  coupon_title: string;
  coupon_sub_title: string;
  discount_percentage: string;
  expiry_date: string;
  total_use_count: number;
  total_discount_given: number;
  total_users: number;
  comission_percentage: string | null;
  users: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_picture: string | null;
    coupon_used_date: string;
    total_discount_recived: string;
  }[];
  total_commission: number | null;
  time_series: {
    date: string;
    usage_count: number;
  }[];
}

const SingleCouponSection = ({ type, id }: SingleCouponSectionProps) => {
  const [data, setData] = useState<CouponData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState("week");
  const [withDrawlAmount, getWithdrawlAmount] = useState<number>()

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.post(`/coupon-analytics/?period=${filterType}`, { coupon_id: id });
        setData(response.data as CouponData);
      } catch (err) {
        console.error("Failed to fetch coupon data:", err);
        setError("Failed to load coupon data.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id, filterType]);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading coupon data...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!data) {
    return <div className="p-6 text-center text-gray-500">No data found for this coupon.</div>;
  }

  // Prepare data for child components
  const statsCardData = {
    totalUseCoupon: data.total_use_count,
    totalDiscountCoupon: data.total_discount_given,
  };

  const chartData = data.time_series.map(item => ({
    name: item.date,
    usage: item.usage_count
  }));

  // Properly structure the coupon details data
  const couponDetailsData = {
    code: data.code,
    name: data.name,
    coupon_title: data.coupon_title,
    coupon_sub_title: data.coupon_sub_title,
    discountPercentage: data.discount_percentage,
    expiryDate: data.expiry_date,
    commission_percentage: data.comission_percentage,
    type: type,
  };

  return (
    <main className="space-y-6 p-4 bg-white">

      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col pt-4 gap-4 ">
          <CouponComponentHeader title={type} type={"General"} />
          <CouponStatsCardsSection
            totalCouponsUsed={statsCardData.totalUseCoupon}
            totalDiscountGiven={statsCardData.totalDiscountCoupon}
          />
        </div>
        <CouponSalesAnalyticsChart
          chartData={chartData}
          setFilterType={setFilterType}
          filterType={filterType}
        />
      </section>

      {type.toLowerCase() === "influencer" && (
        <>
          <CommissionDetailPage
            total_commission={data.total_commission || 0}
            withDrawlAmmount={withDrawlAmount || 0}
          // users={data.users} 
          />
          <CommissionWithdrawls
            id={id}
            getWithdrawlCommission={getWithdrawlAmount}
          // totalCommission={data.total_commission} 
          // users={data.users} 
          />
        </>
      )}

      <CouponDetailPage
        couponDetails={couponDetailsData}
        applicants={data.users}
        couponImage="/placeholder-coupon.jpg" // Add your default coupon image path
      />
    </main>
  );
};

export default SingleCouponSection;