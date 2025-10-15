import React from "react";

import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";
import { IBlog } from "@/types/cms";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const BlogConstants = (dispatch: AppDispatch,): Col<IBlog>[] => {
  return [
    {
      title: "BLOG NAME",
      render: (data: IBlog) => (
        <div className="flex items-center gap-3">
          <div className="w-17 h-17 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={data.cover_image || "/placeholder.svg?height=40&width=40"}
              alt={data.title}
              width={68}
              height={68}
              className="object-cover w-full h-full"
            />
          </div>

          <span className="text-xs text-foreground">{data.title}</span>
        </div>
      ),
    },

    {
      title: "AUTHOR",
      render: (data: IBlog) => <span>{data.author || "-"}</span>,
    },
    {
      title: "CATEGORY",
      render: (data: IBlog) => <span>{data.category?.name}</span>,
    },
    {
      title: "TAGS",
      render: (data: IBlog) => <span>{data.tags}</span>,
    },

    {
      title: "STATUS",
      render: (data: IBlog) => (
        <TableStatusSwitch type={ETypes.BLOGS} rowData={data} />
      ),
    },

    {
      title: "Action",
      render: (data: IBlog) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.BLOGS}
            name={data?.title as string}
          />
        </div>
      ),
    },
  ];
};
