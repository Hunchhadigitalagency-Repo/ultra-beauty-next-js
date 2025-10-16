import React from "react";
import Image from "next/image";
import NoOrderDropdown from "./no-order-status-dropdown";
import { IReturnProducts } from "@/types/cancel";
import { Col } from "@/types/table";

export const ReturnRequestConstant = (): Col<IReturnProducts>[] => {
  return [
    {
      title: "ID",
      render: (data: IReturnProducts) => <span className="text-xs">{data.id}</span>,
    },

    {
      title: "PRODUCT",
      render: (data: IReturnProducts) => {
        const product = data.order_detail_info.product;
        return (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={product?.images?.[0] || "/placeholder.png"}
                alt={product?.name}
                width={40}
                height={40}
                className="rounded-md object-cover"
              />
            </div>
            <span className="text-xs text-foreground">{product?.name}</span>
          </div>
        );
      },
    },

    {
      title: "QUANTITY",
      render: (data: IReturnProducts) => (
        <span className="text-xs">{data.order_detail_info.quantity}</span>
      ),
    },

    {
      title: "VARIETY",
      render: (data: IReturnProducts) => {
        const variant = data.order_detail_info.product_variant;
        return (
          <div className="flex gap-2 mt-1 flex-col">
            {variant ? (
              <div className="text-[10px] border h-[20px] text-black bg-gray-100 rounded-2xl w-[100px] p-1 flex justify-center items-center">
                {variant?.product_variants && variant.product_variants.length > 0 ? (
                  variant.product_variants.map((vari) => (
                    <span key={vari.id} className="">
                      {vari.attribute_variant.name}
                    </span>
                  ))
                ) : (
                  <span className="">
                    -
                  </span>
                )}
              </div>
            ) : (
              <div className="text-[10px] border h-[20px] text-black bg-gray-100 rounded-2xl w-[100px] p-1 flex justify-center items-center">
                No variants
              </div>
            )}
          </div>
        );
      },
    },

    {
      title: "PRICE",
      render: (data: IReturnProducts) => <span className="text-xs">{data.order_detail_info.price}</span>,
    },

    {
      title: "ATTACHMENT",
      render: (data: IReturnProducts) => (
        <div className="flex flex-col items-start">
          {data.attachment ? (
            <Image
              src={data.attachment}
              alt="Attachment"
              width={40}
              height={40}
              className="rounded-md shadow-sm border border-gray-200"
            />
          ) : (
            <span className="text-sm text-gray-500 italic">-</span>
          )}
        </div>
      ),
    },

    {
      title: "ACTION TYPE",
      render: (data: IReturnProducts) => (
        <div
          className="flex gap-2 w-full justify-end h-[50px]"
          onClick={(e) => e.stopPropagation()}
        >
          <NoOrderDropdown initial_status={data.status} id={data.id} />
        </div>
      ),
    },
  ];
};
