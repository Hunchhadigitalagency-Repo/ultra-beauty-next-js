import React from "react";

import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";


export const UserManagementConstants = (dispatch: AppDispatch): Col<any>[] => {
  return [
    {
      title: "FULL NAME",
      render: (data: any) => (
        <div className="flex items-center gap-3">
          <div className="w-17 h-17 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={data.cover_image || "/placeholder.svg?height=40&width=40"}
              alt={data.title}
              width={68}
              height={68}
              className="object-cover"
            />
          </div>

          <span className="text-xs text-foreground">{data.title}</span>
        </div>
      ),
    },

    {
      title: "BLOG SUB-TITLE",
      render: (data: any) => <span>{data.sub_title}</span>,
    },

    {
      title: "AUTHOR",
      render: (data: any) => <span>{data.author?.username}</span>,
    },
    {
      title: "CATEGORY",
      render: (data: any) => <span>{data.category?.name}</span>,
    },
    {
      title: "TAGS",
      render: (data: any) => <span>{data.tags}</span>,
    },

    {
      title: "Action",
      render: (data: any) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.USER_MANAGEMENT}
            name={data?.title as string}
          />
        </div>
      ),
    },
  ];
};
