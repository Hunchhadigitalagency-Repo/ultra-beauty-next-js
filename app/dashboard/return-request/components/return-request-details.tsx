// components/return-request-details.tsx
"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { IReturnProducts } from "@/types/cancel";

interface ReturnRequestDetailsProps {
  data: IReturnProducts | null;
  onClose: () => void;
}

const ReturnRequestDetails: React.FC<ReturnRequestDetailsProps> = ({
  data,
  onClose,
}) => {
  if (!data) return null;

  const product = data.order_detail_info.product;
  const variant = data.order_detail_info.product_variant;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex"
      onClick={handleBackdropClick}
    >
      <div className="bg-white w-[400px] h-full shadow-lg p-8 overflow-y-auto animate-slideInRight ml-auto">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <Image
                src={product?.images?.[0] || "/placeholder.png"}
                alt={product?.name}
                width={50}
                height={50}
                className="rounded-md object-cover"
              />
              <h2 className="text-sm font-semibold">{product?.name}</h2>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Price: {data.order_detail_info.price} | Discount:{" "}
              {product?.discount_percentage || "0"}%
            </p>
          </div>

          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Details */}
        <div className="mt-4 space-y-4 text-sm divide-y">
          <div className="flex justify-between py-2">
            <span className="font-medium">ORDER ID</span>
            <span>#{data.order_id}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="font-medium">QUANTITY</span>
            <span>{data.order_detail_info.quantity}</span>
          </div>

          <div className="py-2">
            <span className="font-medium">VARIETY</span>
            <div className="flex gap-2 mt-1 flex-col">
              {variant ? (
                <div className="text-[10px] border h-[20px] text-black bg-gray-100 rounded-2xl w-[100px] p-1 flex justify-center items-center">
                  {variant.item_name}
                </div>
              ) : (
                <div className="text-[10px] border h-[20px] text-black bg-gray-100 rounded-2xl w-[100px] p-1 flex justify-center items-center">
                  No variants
                </div>
              )}
            </div>
          </div>

          <div className="py-2">
            <span className="font-medium">STATUS</span>
            <span
              className={`capitalize text-xs px-2 py-1 rounded ${
                data.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : data.status === "cancelled"
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {data.status}
            </span>
          </div>

          <div className="py-2">
            <span className="font-medium">Reason</span>
            <p className="text-xs mt-1">{data.reason || "-"}</p>
          </div>

          <div className="py-2">
            <span className="font-medium">Description</span>
            <p className="text-xs mt-1">{product?.general_description || "-"}</p>
          </div>

          <div className="py-2">
            <span className="font-medium">Detailed Description</span>
            <p className="text-xs mt-1">{product?.detail_description || "-"}</p>
          </div>

          <div className="py-2">
            <span className="font-medium">Attachment</span>
            {data.attachment ? (
              <Image
                src={data.attachment}
                alt="Attachment"
                width={40}
                height={40}
                className="rounded-md shadow-sm border border-gray-200 mt-1"
              />
            ) : (
              <span className="text-sm text-gray-500 italic mt-1">-</span>
            )}
          </div>

          <div className="py-2">
            <span className="font-medium">Additional Info</span>
            <p className="text-xs mt-1">{data.additional_info || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnRequestDetails;
