import React from "react";

import { AppDispatch } from "@/redux/store";

import { Col, ETypes } from "@/types/table";
import TableActions from "@/components/common/table/table-actions";
import { IBlogCategory } from "@/types/Settings";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";
import { setSelectedData } from "@/redux/features/authentication-slice";

export const BlogCategoryConstant = (
  dispatch: AppDispatch
): Col<IBlogCategory>[] => {
  console.log(dispatch);
  return [
    {
      title: "BLOG CATEGORY NAME",
      render: (data: IBlogCategory) => <span>{data.name}</span>,
    },
    {
      title: "STATUS",
      render: (data: IBlogCategory) => (
        <TableStatusSwitch type={ETypes.BLOG_CATEGORY} rowData={data} />
      ),
    },
    {
      title: "ACTION",
      render: (data: IBlogCategory) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.BLOG_CATEGORY}
            name={data.name as string}
          />
        </div>
      ),
    },
  ];
};
