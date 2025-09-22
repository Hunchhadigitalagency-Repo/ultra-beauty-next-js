import React from "react";

import { AppDispatch } from "@/redux/store";

import { Col, ETypes } from "@/types/table";
import TableActions from "@/components/common/table/table-actions";
import { ICategory } from "@/types/Settings";
import { setSelectedData } from "@/redux/features/authentication-slice";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const CategoryConstant = (dispatch: AppDispatch, onUpdate: (item: ICategory) => void): Col<ICategory>[] => {
  return [
    {
      title: "CATEGORY NAME",
      render: (data: ICategory) => <span>{data.name}</span>,
    },
    {
      title: "STATUS",
      render: (data: ICategory) => (
        <TableStatusSwitch type={ETypes.CATEGORY} rowData={data} onUpdate={onUpdate} />
      ),
    },
    {
      title: "ACTION",
      render: (data: ICategory) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.CATEGORY}
            name={data?.name as string}
          />
        </div>
      ),
    },
  ];
};
