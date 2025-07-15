import React from "react";

import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";
import StatusCard from "@/components/common/cards/outline-status-card";
import { IProduct } from "@/types/product";

export const ProductConstants = (dispatch: AppDispatch): Col<IProduct>[] => {
  return [
    {
      title: "PRODUCT NAME",

      render: (data: IProduct) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={"/placeholder.svg?height=40&width=40"}
              alt={data.name}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <span className="font-medium text-gray-800">{data.name}</span>
        </div>
      ),
    },
    {
      title: "PRICE",

      render: (data: IProduct) => <span>{data.price}</span>,
    },
    {
      title: "STATUS",

      render: () => <StatusCard status={""} />,
    },
    {
      title: "SOLD",

      render: () => <span>{}</span>,
    },
    {
      title: "TOTAL EARNINGS",
      render: () => <span>{}</span>,
    },

    {
      title: "Action",
      render: (data: IProduct) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.PRODUCTS}
            name={data?.name as string}
          />
        </div>
      ),
    },
  ];
};
