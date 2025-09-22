"use client";

import { useParams } from "next/navigation";
import SingleCouponSection from "../../components/single-coupon-section";

const GeneralCouponPage = () => {
  const params = useParams();
  const slug = params?.slug as string;
  if (!slug) return <div>Invalid Coupon ID</div>;
  return <SingleCouponSection type="general" id={slug} />;
};

export default GeneralCouponPage;
