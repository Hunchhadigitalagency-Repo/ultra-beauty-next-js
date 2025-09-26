import React from "react";

import { AppDispatch } from "@/redux/store";

import { Col, ETypes } from "@/types/table";
import TableActions from "@/components/common/table/table-actions";
import { IAttribute } from "@/types/Settings";
import { setSelectedData } from "@/redux/features/authentication-slice";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const AttributeConstant = (dispatch: AppDispatch, onUpdate: (item: IAttribute) => any): Col<IAttribute>[] => {
  return [
    {
      title: "ATTRIBUTE",
      render: (data: IAttribute) => <span>{data.name}</span>,
    },

    {
      title: "STATUS",
      render: (data: IAttribute) => (
        <TableStatusSwitch type={ETypes.ATTRIBUTE} rowData={data} onUpdate={onUpdate}/>
      ),
    },

    {
      title: "ACTION",
      render: (data: IAttribute) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.ATTRIBUTE}
            name={data?.name as string}
          />
        </div>
      ),
    },
  ];
};
