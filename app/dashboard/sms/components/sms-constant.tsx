import React from "react";
import { AppDispatch } from "@/redux/store";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";
import { ISms } from "@/types/cms";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const SmsConstants = (dispatch: AppDispatch): Col<ISms>[] => {
  return [
    {
      title: "TITLE",
      render: (data: ISms) => <span>{data.title}</span>,
    },

    {
      title: "SUBJECT HEADER",
      render: (data: ISms) => <span>{data.subject_header}</span>,
    },

    {
      title: "STATUS",
      render: (data: ISms) => (
        <TableStatusSwitch type={ETypes.SMS} rowData={data} />
      ),
    },

    {
      title: "Action",
      render: (data: ISms) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.SMS}
            name={data?.title as string}
          />
        </div>
      ),
    },
  ];
};
