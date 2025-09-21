import React from "react";


import Image from "next/image";
import { Col } from "@/types/table";
import { AppDispatch } from "@/redux/store";
// import StatusCard from "@/components/common/cards/outline-status-card";
import { TopSellingProduct } from "@/types/dashboard";

export const TopSellingConstants = (dispatch: AppDispatch): Col<TopSellingProduct>[] => {
  console.log(dispatch);
  return [
    {
      title: "PRODUCT NAME",
      render: (topSellingProductResponse: TopSellingProduct) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={topSellingProductResponse.image_url || "/placeholder.svg?height=40&width=40"}
              alt={topSellingProductResponse.product_name}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <span className="font-medium text-gray-800">{topSellingProductResponse.product_name}</span>
        </div>
      ),
    },
    {
      title: "PRICE",
      render: (topSellingProductResponse: TopSellingProduct) => <span>{topSellingProductResponse.price}</span>,
    },
    // {
    //   title: "STATUS",
    //   render: (topSellingProductResponse: TopSellingProduct) => <p>Backend bata data aako chaina</p>,
    // },
    {
      title: "SOLD",
      render: (topSellingProductResponse: TopSellingProduct) => <span>{topSellingProductResponse.total_quantity_sold}</span>,
    },
    {
      title: "TOTAL EARNING",
      render: (topSellingProductResponse: TopSellingProduct) => <span>{topSellingProductResponse.total_earning}</span>,
    },
  ];
};
