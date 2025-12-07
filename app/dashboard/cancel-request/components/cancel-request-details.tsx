// components/cancel-request-detail.tsx
"use client";
import React from "react";
import Image from "next/image";
import { CancelRequest } from "@/types/cancel"; // Updated type
import { X } from "lucide-react";
import DOMPurify from "dompurify";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import { useRouter } from "next/navigation";

interface CancelRequestDetailProps {
  data: CancelRequest | null;
  onClose: () => void;
}

const CancelRequestDetail: React.FC<CancelRequestDetailProps> = ({
  data,
  onClose,
}) => {
  const router = useRouter();

  if (!data) return null;

  const handleBackdropClick = (e: any) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex"
      onClick={handleBackdropClick}
    >
      <div className="bg-white w-[450px] h-full shadow-lg p-8 overflow-y-auto animate-slideInRight ml-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold">Cancel Request Details</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Info */}
        <div className="space-y-4 text-sm divide-y">
          <div className="flex justify-between py-2">
            <span className="font-medium">ORDER ID</span>
            <div
              onClick={() =>
                router.push(`/dashboard/orders/single/${data.order.id}`)
              }
              className="flex items-center gap-2 cursor-pointer"
            >
              <span>#{data.order.id}</span>
              <HiMiniArrowTopRightOnSquare className="text-xl" />
            </div>
          </div>

          <div className="py-2">
            <span className="font-medium">Reason</span>
            <p className="text-xs mt-1">{data.reason}</p>
          </div>

          <div className="py-2">
            <span className="font-medium">Additional Info</span>
            <p className="text-xs mt-1">{data.additional_info}</p>
          </div>

          {/* Order Details */}
          {data.order.order_details.map((item) => (
            <div key={item.id} className="py-4 border-b">
              <div className="flex gap-3 items-center mb-2">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  width={50}
                  height={50}
                  className="rounded-md object-cover"
                />
                <h3 className="font-medium">{item.product.name}</h3>
              </div>
              <div className="flex justify-between text-xs">
                <span>Quantity:</span>
                <span>{item.quantity}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Price:</span>
                <span>${item.price}</span>
              </div>
              <div className="py-2">
                <span className="font-medium text-xs">General Description</span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item.product.general_description),
                  }}
                ></div>
              </div>
              <div className="py-2">
                <span className="font-medium text-xs">Detail Description</span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item.product.detail_description),
                  }}
                ></div>
              </div>
            </div>
          ))}

          {/* Shipping Info */}
          <div className="py-2">
            <span className="font-medium">Shipping Info</span>
            <p className="text-xs mt-1">
              {data.order.shipping_info.first_name} {data.order.shipping_info.last_name} <br />
              {data.order.shipping_info.phone_no} <br />
              {data.order.shipping_info.email} <br />
              {data.order.shipping_info.address}, {data.order.shipping_info.city}, {data.order.shipping_info.province}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelRequestDetail;
