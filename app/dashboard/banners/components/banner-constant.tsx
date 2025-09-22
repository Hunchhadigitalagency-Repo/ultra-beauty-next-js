import React from "react";

import { AppDispatch } from "@/redux/store";
import TableActions from "@/components/common/table/table-actions";
import { Col, ETypes } from "@/types/table";
import { IDashboardBanner } from "@/types/banner";
import { setSelectedData } from "@/redux/features/authentication-slice";

export const BannerConstant = (dispatch: AppDispatch): Col<IDashboardBanner>[] => {
  return [
    {
      title: "BANNER TYPE",
      render: (data: IDashboardBanner) => (
        <span className="text-xs text-foreground">{data.banner_type}</span>
      ),
    },

    {
      title: "TITLE",
      render: (data: IDashboardBanner) => <span>{data.title}</span>,
    },
    {
      title: "PAGE",
      render: (data: IDashboardBanner) => {
        const pageMapping: Record<string, string> = {
          best_seller: "Best Seller",
          all_product: "All Product",
          category: "Category",
        };

        if (!data.page) {
          return <span>General</span>;
        }

        return (
          <span>
            {pageMapping[data.page] ??
              data.page
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
          </span>
        );
      },
    },

    {
      title: "ACTIONS",
      render: (data: IDashboardBanner) => (
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
