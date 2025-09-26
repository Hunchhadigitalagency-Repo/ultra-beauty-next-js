// components/cancel-request-detail.tsx
"use client";
import React from "react";
import Image from "next/image";
import { CancelRequest } from "@/types/cancel";
import { X } from "lucide-react";

interface CancelRequestDetailProps {
  data: CancelRequest | null;
  onClose: () => void;
}

const ReturnRequestDetails: React.FC<CancelRequestDetailProps> = ({
  data,
  onClose,
}) => {
  if (!data) return null;
  const handleBackdropClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex"
      onClick={(e) => handleBackdropClick(e)}
    >
      <div className="bg-white w-[400px] h-full shadow-lg p-8 overflow-y-auto animate-slideInRight ml-auto">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <Image
                src={data.productImage}
                alt={data.productName}
                width={50}
                height={50}
                className="rounded-md object-cover"
              />
              <h2 className="text-sm font-semibold">{data.productName}</h2>
            </div>

            <p className="text-xs text-muted-foreground mt-1">
              {data.description}
            </p>
          </div>

          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-sm divide-y">
          <div className="flex justify-between py-2">
            <span className="font-medium">ORDER ID</span>
            <span>#{data.orderId}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="font-medium">INVOICE ID</span>
            <span>#{data.invoiceId}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="font-medium">QUANTITY</span>
            <span>{data.quantity}</span>
          </div>

          <div className="py-2 flex justify-between">
            <span className="font-medium">VARIETY</span>
            <div className="flex gap-2 mt-1 flex-col">
              {data?.product_variants?.length > 0 ? (
                data?.product_variants?.map((att: any, index: number) => (
                  <div
                    key={index}
                    className="text-[10px] border h-[20px] text-black bg-gray-100 rounded-2xl w-[100px] p-1 flex justify-center items-center"
                  >
                    {att.attribute_variant?.name}
                  </div>
                ))
              ) : (
                <div className="text-[10px] border h-[20px] text-black bg-gray-100 rounded-2xl w-[100px] p-1 flex justify-center items-center">
                  No variants
                </div>
              )}
            </div>
          </div>

          <div className="py-2 flex justify-between">
            <span className="font-medium">ACTION</span>
            <div className="mt-1">
              <span
                className={`capitalize text-xs px-2 py-1 rounded ${
                  data.status === "Requested"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {data.status}
              </span>
            </div>
          </div>

          <div className="py-2">
            <span className="font-medium">Reason</span>
            <p className="text-xs mt-1">{data.reason}</p>
          </div>

          <div className="py-2">
            <span className="font-medium">Description</span>
            <p className="text-xs mt-1">{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnRequestDetails;
