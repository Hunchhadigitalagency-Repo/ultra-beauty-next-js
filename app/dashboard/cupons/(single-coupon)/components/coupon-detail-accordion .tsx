"use client";

import { useState } from "react";
import Image from "next/image";
import { Search,  } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent,  } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import DateChips from "@/components/common/chips/date-chips";
// import CustomTable from "@/components/common/table/custom-table";
// import { CouponApplicantDetailConstant } from "./coupon-applicant-detail-constant";

// Updated interfaces to match the actual data structure
interface CouponDetail {
  label: string;
  value: string;
}

export interface Product {
  name: string;
  image: string;
  variation: string;
  quantity: number;
  totalAmount: string;
  discountAmount: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture: string | null;
  coupon_used_date: string;
  total_discount_recived: string;
}

interface CouponDetailData {
  code: string;
  name: string;
  coupon_sub_title: string;
  coupon_title: string;
  discountPercentage: string;
  commission_percentage: string | null;
  expiryDate: string;
  type: string;
}

interface CouponDetailPageProps {
  couponDetails: CouponDetailData;
  applicants: User[];
  couponImage?: string;
}

export default function CouponDetailPage({
  couponDetails,
  applicants,
}: CouponDetailPageProps) {
  // const [isActive, setIsActive] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  // const [expandedApplicants, setExpandedApplicants] = useState<Set<number>>(new Set());

  // const toggleApplicant = (id: number) => {
  //   setExpandedApplicants((prev) => {
  //     const newSet = new Set(prev);
  //     if (newSet.has(id)) {
  //       newSet.delete(id);
  //     } else {
  //       newSet.add(id);
  //     }
  //     return newSet;
  //   });
  // };

  const filteredApplicants = applicants?.filter((applicant) =>
    `${applicant.first_name} ${applicant.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Transform coupon details into the expected format
  const transformedCouponDetails: CouponDetail[] = [
    { label: "COUPON CODE", value: couponDetails.code },
    { label: "COUPON TITLE", value: couponDetails.coupon_sub_title },
    { label: "COUPON SUB-TITLE", value: couponDetails.coupon_sub_title },
    { label: "COUPON NAME", value: couponDetails.name },
    { label: "COUPON TYPE", value: couponDetails.type },
    { label: "DISCOUNT PERCENTAGE", value: `${couponDetails.discountPercentage}%` },
    {
      label: "COMMISSION PERCENTAGE",
      value: couponDetails.commission_percentage !== undefined && couponDetails.commission_percentage !== null
        ? `${couponDetails.commission_percentage}%`
        : "-"
    },
    {
      label: "EXPIRY DATE",
      value: couponDetails.expiryDate
        ? new Date(couponDetails.expiryDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
        : "-"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Accordion
        type="multiple"
        defaultValue={["general-details", "applicant-details"]}
        className="space-y-4"
      >
        <AccordionItem value="general-details" className="rounded-sm border-0">
          <AccordionTrigger className="px-6 bg-[#EEEEEE] py-4 hover:no-underline">
            <h2 className="text-base font-semibold text-gray-900">
              Coupon General Details
            </h2>
          </AccordionTrigger>
          <AccordionContent>
            <Card className="border-0 gap-1 rounded-sm shadow-none">
              <CardContent className="w-full px-0">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="divide-y space-y-1 divide-gray-200 border rounded-sm py-2 px-4 col-span-1">
                    {transformedCouponDetails.map((item, index) => (
                      <div key={index} className="py-2 px-4 grid grid-cols-2 gap-4">
                        <p className="w-48 text-sm text-gray-500 font-medium uppercase">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-gray-800 ml-10 md:ml-0">
                          <span className="pr-4">:</span>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="w-full border rounded-sm p-3 col-span-1">
                    <Image
                      src="https://fastly.picsum.photos/id/988/400/200.jpg?hmac=AkVEGlGb8li4kyUavvJQ_lJh73wWF5vW4pBqCrlUgmA"
                      alt="Restaurant or Cafe"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover rounded-sm shadow-sm border"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="applicant-details" className="rounded-lg border-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline bg-[#EEEEEE]">
            <h2 className="text-base font-semibold text-gray-900">
              Coupon Applicant Details
            </h2>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="flex items-center justify-between p-3">
              <div className="flex gap-6 items-center justify-between">
                <h3 className="text-base font-medium text-gray-900">
                  Applied by
                </h3>
                <span className="text-sm text-gray-600">
                  {applicants.length} users
                </span>
              </div>
              <div className="flex flex-col items-center sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search Applied Users"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {filteredApplicants.length > 0 ? (
                filteredApplicants.map((applicant) => (
                  <Card
                    key={applicant.id}
                    className="overflow-hidden p-0 rounded-sm shadow-none"
                  >
                    <CardContent className="px-4 py-6">
                      <div className="grid md:grid-cols-3 items-center divide-x divide-gray-400">
                        <div className="col-span-1 flex items-center space-x-4 pr-4">
                          <Avatar className="h-15 w-15">
                            <AvatarImage
                              src={applicant.profile_picture || "/default-avatar.jpg"}
                              alt={`${applicant.first_name} ${applicant.last_name}`}
                            />
                            <AvatarFallback>
                              {applicant.first_name[0]}{applicant.last_name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {applicant.first_name} {applicant.last_name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {applicant.email}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-1 text-center px-4">
                          <p className="text-sm text-gray-600">
                            Total Discount Received
                          </p>
                          <p className="font-medium text-gray-900">

                            {applicant.total_discount_recived}
                          </p>
                        </div>
                        <div className="col-span-1 text-center px-4">
                          <p className="text-sm text-gray-600">
                            Coupon Used On
                          </p>
                          <p className="font-medium text-gray-900">
                            <DateChips date={applicant.coupon_used_date || ""} />
                          </p>
                        </div>

                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center text-gray-500 py-10">
                  No applicants found.
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}