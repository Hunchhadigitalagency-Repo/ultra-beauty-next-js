import React from "react";

import { Col } from "@/types/table";
import Image from "next/image";

export const CouponApplicantDetailConstant = (): Col<any>[] => {
  return [
    {
      title: "PRODUCTS",
      render: (data: any) => (
        <div className="flex items-center gap-3">
          <Image
            src={data.image}
            alt={data.name}
            height={50}
            width={50}
            className="rounded-xs"
          />
          <span>{data.name}</span>
        </div>
      ),
    },
    {
      title: "VARIATION",
      render: (data: any) => <span>{data.variation}</span>,
    },
    {
      title: "QUANTITY",
      render: (data: any) => <span>{data.quantity}</span>,
    },
    {
      title: "TOTAL AMOUNT",
      render: (data: any) => <span>{data.totalAmount}</span>,
    },
    {
      title: "DISCOUNT AMOUNT",
      render: (data: any) =>
        <div className="flex w-full justify-start">
          <span>{data.discountAmount}</span>,
        </div>
    },
  ];
};
