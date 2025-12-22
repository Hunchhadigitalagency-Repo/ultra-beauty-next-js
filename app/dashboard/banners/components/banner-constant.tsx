import React from "react";

import { AppDispatch } from "@/redux/store";
import TableActions from "@/components/common/table/table-actions";
import { Col, ETypes } from "@/types/table";
import { IDashboardBanner } from "@/types/banner";
import { setSelectedData } from "@/redux/features/authentication-slice";
import Image from "next/image";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const BannerConstant = (dispatch: AppDispatch): Col<IDashboardBanner>[] => {
  return [
    {
      title: "NAME",
      render: (data: IDashboardBanner) => (
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={data.image || "/placeholder.svg?height=40&width=40"}
              alt={data.title}
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-xs text-foreground">{data.banner_type}</span>
        </div>
      ),
    },
    {
      title: "BANNER TYPE",
      render: (data: IDashboardBanner) => (
        <span className="text-xs text-foreground">{data.banner_type}</span>
      ),
    },

    {
      title: "STATUS",
      render: (data: IDashboardBanner) => <TableStatusSwitch type={ETypes.BANNERS} rowData={data}/>,
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
