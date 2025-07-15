import React from "react";

import { AppDispatch } from "@/redux/store";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";
import { ICoupon } from "@/types/cupons";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const InfluencerCouponConstant = (
  dispatch: AppDispatch
): Col<ICoupon>[] => {
  return [
    {
      title: "COUPON NAME",
      render: (data: ICoupon) => (
        <span className="text-xs text-foreground">{data.name}</span>
      ),
    },

    {
      title: "DISCOUNT COUPON (%)",
      render: (data: ICoupon) => <span>{data.discount_percentage}</span>,
    },
    {
      title: "COMMISSION COUPON (%)",
      render: (data: ICoupon) => <span>{data.commission_percentage}</span>,
    },

    {
      title: "COUPON CODE",
      render: (data: ICoupon) => <span>{data.code}</span>,
    },

    {
      title: "WITHDRAWAL LIMIT",
      render: (data: ICoupon) => <span>{data.withdrawal_limit}</span>,
    },

    {
      title: "STATUS",
      render: (data: ICoupon) => (
        <TableStatusSwitch type={ETypes.COUPON} rowData={data} />
      ),
    },

    {
      title: "ACTIONS",
      render: (data: ICoupon) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.COUPON}
            name={data?.name as string}
          />
        </div>
      ),
    },
  ];
};
