import React from "react";

import { AppDispatch } from "@/redux/store";
import TableActions from "@/components/common/table/table-actions";
import { Col, ETypes } from "@/types/table";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";
import { IBanner } from "@/types/banner";
import { setSelectedData } from "@/redux/features/authentication-slice";

export const BannerConstant = (dispatch: AppDispatch): Col<IBanner>[] => {
  return [
    {
      title: "BANNER TYPE",
      render: (data: IBanner) => (
        <span className="text-xs text-foreground">{data.banner_type}</span>
      ),
    },

    {
      title: "TITLE",
      render: (data: IBanner) => <span>{data.title}</span>,
    },

    {
      title: "SUB TITLE",
      render: (data: IBanner) => <span>{data.subtitle}</span>,
    },

    {
      title: "DISCOUNT (%)",
      render: (data: IBanner) => <span>{data.discount_percentage || 0}</span>,
    },

    {
      title: "STATUS",
      render: (data: IBanner) => (
        <TableStatusSwitch type={ETypes.BANNERS} rowData={data} />
      ),
    },

    {
      title: "ACTIONS",
      render: (data: IBanner) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.BANNERS}
            name={data?.title as string}
          />
        </div>
      ),
    },
  ];
};
