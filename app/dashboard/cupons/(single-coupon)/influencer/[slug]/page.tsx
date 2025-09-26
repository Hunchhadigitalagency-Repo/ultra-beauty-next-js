"use client";

import { useParams } from "next/navigation";
import SingleCouponSection from "../../components/single-coupon-section";

const InfluencerCouponPage = () => {
  const params = useParams();
  const slug = params?.slug as string;
  if (!slug) return <div>Invalid Coupon ID</div>;
  return <SingleCouponSection type="Influencer" id={slug} />;
};

export default InfluencerCouponPage;
