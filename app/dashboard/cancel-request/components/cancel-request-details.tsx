// components/cancel-request-detail.tsx
"use client";
import React from "react";
import Image from "next/image";
import { ICancelProducts } from "@/types/cancel";
import { X } from "lucide-react";
import DOMPurify from "dompurify";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import { useRouter } from "next/navigation";

interface CancelRequestDetailProps {
  data: ICancelProducts | null;
  onClose: () => void;
}

const CancelRequestDetail: React.FC<CancelRequestDetailProps> = ({
  data,
  onClose,
}) => {
  const router = useRouter();

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
                src={data?.product?.images[0]}
                alt={data?.product?.name}
                width={50}
                height={50}
                className="rounded-md object-cover"
              />
              <h2 className="text-sm font-semibold">{data?.product?.name}</h2>
            </div>
          </div>

          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-sm divide-y">
          <div className="flex justify-between py-2">
            <span className="font-medium">ORDER ID</span>
            <div
              onClick={() =>
                router.push(`/dashboard/orders/single/${data?.order_id}`)
              }
              className="flex items-center gap-4 cursor-pointer"
            >
              <span>#{data?.order_id}</span>
              <HiMiniArrowTopRightOnSquare className="text-xl" />
            </div>
          </div>

          <div className="flex justify-between py-2">
            <span className="font-medium">QUANTITY</span>
            <span>{data.quantity}</span>
          </div>

          <div className="py-2">
            <span className="font-medium">Reason</span>
            <p className="text-xs mt-1">{data?.reason}</p>
          </div>

          <div className="py-2">
            <span className="font-medium">Additional Info</span>
            <p className="text-xs mt-1">{data?.additional_info}</p>
          </div>

          <div className="py-2">
            <span className="font-medium">GeneralDescription</span>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data?.product?.general_description),
              }}
            ></div>
          </div>
          <div className="py-2">
            <span className="font-medium">Detail Description</span>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data?.product?.detail_description),
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelRequestDetail;