import React from "react";
import { Col } from "@/types/table";
import Image from "next/image";
import { CancelRequest } from "@/types/cancel";

export const CancelRequestConstant = (): Col<CancelRequest>[] => {
  return [
    {
      title: "PRODUCT",
      render: (data: CancelRequest) => {
        const imageSrc = data?.product?.image || "/placeholder.png";
        const productName = data?.product?.name || "Unnamed product";

        return (
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 border">
              <Image
                src={imageSrc}
                alt={productName}
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>

            <span className="text-xs text-foreground truncate max-w-[180px]">
              {productName}
            </span>
          </div>
        );
      },
    },

    {
      title: "QUANTITY",
      render: (data: CancelRequest) => (
        <span className="text-xs flex justify-center md:justify-start">
          {data?.quantity ?? 0}
        </span>
      ),
    },

    {
      title: "PRICE",
      render: (data: CancelRequest) => (
        <span className="text-xs flex justify-center md:justify-start">
          {data?.price ?? "0.00"}
        </span>
      ),
    },

    {
      title: "STATUS",
      render: (data: CancelRequest) => (
        <span
          className={`text-[11px] px-2 py-1 rounded-full border capitalize
            ${
              data?.status === "cancelled"
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-gray-50 text-gray-700 border-gray-200"
            }`}
        >
          {data?.status ?? "unknown"}
        </span>
      ),
    },
  ];
};
