import React from "react";
import { AppDispatch } from "@/redux/store";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";
import { INewsletters } from "@/types/cms";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const NewsletterConstants = (
  dispatch: AppDispatch,
): Col<INewsletters>[] => {
  return [
    {
      title: "TITLE",
      render: (data: INewsletters) => <span>{data.title}</span>,
    },

    {
      title: "SUBJECT HEADER",
      render: (data: INewsletters) => <span>{data.subject_header}</span>,
    },

    {
      title: "STATUS",
      render: (data: INewsletters) => (
        <TableStatusSwitch type={ETypes.NEWSLETTERS} rowData={data} />
      ),
    },

    {
      title: "Action",
      render: (data: INewsletters) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.NEWSLETTERS}
            name={data?.title as string}
          />
        </div>
      ),
    },
  ];
};
