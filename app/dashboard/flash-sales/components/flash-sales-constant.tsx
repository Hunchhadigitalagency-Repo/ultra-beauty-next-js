import React from "react";

import { AppDispatch } from "@/redux/store";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";
import { IFlashSales } from "@/types/flash-sales";
import DateChips from "@/components/common/chips/date-chips";

export const FlashSalesConstant = (
  dispatch: AppDispatch
): Col<IFlashSales>[] => {
  return [
    {
      title: "SALES NAME",
      render: (data: IFlashSales) => (
        <span className="text-xs text-foreground">{data.sales}</span>
      ),
    },

    {
      title: "DISCOUNT (%)",
      render: (data: IFlashSales) => <span>{data.discount_percentage}</span>,
    },

    {
      title: "START DATE",
      render: (data: IFlashSales) => <span><DateChips date={data.start_date} /></span>,
    },

    {
      title: "EXPIRY DATE",
      render: (data: IFlashSales) => <span><DateChips date={data.end_date} /></span>,
    },
    {
      title: "STATUS",
      render: (data: IFlashSales) => (
        <TableStatusSwitch type={ETypes.FLASH_SALES} rowData={data} />
      ),
    },

    {
      title: "ACTIONS",
      render: (data: IFlashSales) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.FLASH_SALES}
            name={data?.sales as string}
          />
        </div>
      ),
    },
  ];
};
