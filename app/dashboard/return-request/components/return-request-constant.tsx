import React from "react";
import { AppDispatch } from "@/redux/store";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";
import Image from "next/image";
import { CancelRequest } from "@/types/cancel";
import NoOrderDropdown from "./no-order-status-dropdown";

export const ReturnRequestConstant = (
  dispatch: AppDispatch
): Col<CancelRequest>[] => {
  return [
    {
      title: "ID",
      render: (data: CancelRequest) => (
        <span className="text-xs">{data.id}</span>
      ),
    },

    {
      title: "PRODUCT",
      render: (data: CancelRequest) => (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={data?.productImage}
              alt="Returned order image"
              width={40}
              height={40}
              className="rounded-md object-cover"
            />
          </div>
          <span className="text-xs text-foreground">{data.productName}</span>
        </div>
      ),
    },

    {
      title: "QUANTITY",
      render: (data: CancelRequest) => (
        <span className="text-xs">{data.quantity}</span>
      ),
    },

    // Variety
    {
      title: "VARIETY",
      render: (data: CancelRequest) => (
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
      ),
    },

    {
      title: "SHIPPING INFO",
      render: (data: CancelRequest) => {
        console.log(data);
        return (
          <div className="flex flex-col">
            <p>
              {data?.shipping_info?.first_name} {data?.shipping_info?.last_name}
            </p>
            <p>{data?.shipping_info?.phone_no}</p>
            <p>{data?.shipping_info?.address}</p>
          </div>
        );
      },
    },

    {
      title: "ACTION TYPE",
      render: (data: CancelRequest) => {
        return (
          <div
            className="flex gap-2 w-full justify-end h-[50px]"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <NoOrderDropdown initial_status={data.status} id={data.id} />;
          </div>
        )
      },
    },
    // Actions
    {
      title: "ACTIONS",
      render: (data: CancelRequest) => (
        <div
          className="flex gap-2 w-full justify-end h-full"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.RETURN_REQUEST}
            name={data.productName}
          />
        </div>
      ),
    },
  ];
};
