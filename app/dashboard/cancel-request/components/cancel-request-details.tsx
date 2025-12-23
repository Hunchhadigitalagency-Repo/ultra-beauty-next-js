"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import { X } from "lucide-react";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { CancelRequest } from "@/types/cancel";
import DateChips from "@/components/common/chips/date-chips";

interface CancelRequestDetailProps {
  data: CancelRequest | null;
  onClose: () => void;
}

const CancelRequestDetail: React.FC<CancelRequestDetailProps> = ({
  data,
  onClose,
}) => {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!data) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const productName = data?.product?.name ?? "Unnamed product";
  const productImage = data?.product?.image ?? ""; // ✅ correct field
  const orderId = data?.order_id ?? 0;

  const goToOrder = () => {
    if (!orderId) return;
    router.push(`/dashboard/orders/single/${orderId}`);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Cancel Request Details"
    >
      <div
        ref={panelRef}
        className="
          absolute right-0 top-0 h-full w-full sm:w-[520px]
          bg-white shadow-2xl flex flex-col
          animate-in slide-in-from-right duration-200
        "
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b">
          <div className="flex justify-between items-start gap-4 px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Cancel Item Details
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Order #{orderId || "-"} • Status: {data?.status ?? "unknown"}
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="
                inline-flex h-9 w-9 items-center justify-center rounded-full
                text-gray-600 hover:bg-gray-100 hover:text-gray-900
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
              "
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          {/* Order Info */}
          <div className="rounded-xl border bg-gray-50 p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">
                ORDER ID
              </span>

              <button
                type="button"
                onClick={goToOrder}
                disabled={!orderId}
                className={`
                  flex items-center gap-2 text-sm font-semibold transition
                  ${
                    orderId
                      ? "text-gray-900 hover:text-primary"
                      : "text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                #{orderId || "-"}
                <HiMiniArrowTopRightOnSquare className="text-lg" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-white border p-3">
                <p className="text-[11px] text-gray-500 font-medium">Created</p>
                <DateChips date={data?.order_created ?? "-"} />{" "}
              </div>

              <div className="rounded-lg bg-white border p-3">
                <p className="text-[11px] text-gray-500 font-medium">Status</p>
                <p className="text-gray-900 font-semibold">
                  {data?.status ?? "unknown"}
                </p>
              </div>

              <div className="rounded-lg bg-white border p-3">
                <p className="text-[11px] text-gray-500 font-medium">Price</p>
                <p className="text-gray-900 font-semibold">
                  {data?.price ?? "0.00"}
                </p>
              </div>

              <div className="rounded-lg bg-white border p-3">
                <p className="text-[11px] text-gray-500 font-medium">
                  Discount
                </p>
                <p className="text-gray-900 font-semibold">
                  {data?.discount_amount ?? "0.00"}
                </p>
              </div>

              <div className="rounded-lg bg-white border p-3">
                <p className="text-[11px] text-gray-500 font-medium">VAT</p>
                <p className="text-gray-900 font-semibold">
                  {data?.vat_amount ?? "0.00"}
                </p>
              </div>

              <div className="rounded-lg bg-white border p-3">
                <p className="text-[11px] text-gray-500 font-medium">Total</p>
                <p className="text-gray-900 font-semibold">
                  {data?.total_price ?? "0.00"}
                </p>
              </div>
            </div>
          </div>

          {/* Product */}
          <div className="rounded-xl border bg-white p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-lg border overflow-hidden bg-gray-50 flex items-center justify-center">
                {productImage ? (
                  <Image
                    src={productImage}
                    alt={productName}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-cover"
                  />
                ) : (
                  <span className="text-[10px] text-gray-400">No image</span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {productName}
                </p>

                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between rounded-lg bg-gray-50 border px-2 py-1.5">
                    <span className="text-gray-600">Qty</span>
                    <span className="font-medium text-gray-900">
                      {data?.quantity ?? 0}
                    </span>
                  </div>

                  <div className="flex justify-between rounded-lg bg-gray-50 border px-2 py-1.5">
                    <span className="text-gray-600">SKU</span>
                    <span className="font-medium text-gray-900 truncate max-w-[120px]">
                      {data?.product?.sku ?? "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Descriptions (null-safe) */}
            <div className="space-y-3">
              <div className="rounded-lg bg-gray-50 border p-3">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  General Description
                </p>

                {data?.product?.general_description ? (
                  <div
                    className="prose prose-sm max-w-none prose-p:my-1"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        data.product.general_description
                      ),
                    }}
                  />
                ) : (
                  <p className="text-xs text-gray-500">No description.</p>
                )}
              </div>

              <div className="rounded-lg bg-gray-50 border p-3">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  Detail Description
                </p>

                {data?.product?.detail_description ? (
                  <div
                    className="prose prose-sm max-w-none prose-p:my-1"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        data.product.detail_description
                      ),
                    }}
                  />
                ) : (
                  <p className="text-xs text-gray-500">No description.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-white px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="
              w-full rounded-lg border px-4 py-2.5 text-sm font-semibold
              hover:bg-gray-50 transition
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelRequestDetail;
