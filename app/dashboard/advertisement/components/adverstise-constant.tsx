import React from "react";

import { AppDispatch } from "@/redux/store";
import TableActions from "@/components/common/table/table-actions";
import { Col, ETypes } from "@/types/table";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { IAdvertisementBanner } from "@/types/cms";
import Image from "next/image";

export const AdvertiseBannerConstant = (
  dispatch: AppDispatch
): Col<IAdvertisementBanner>[] => {
  return [
    {
      title: "NAME",
      render: (data: IAdvertisementBanner) => (
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={data.image}
              alt="Image "
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ),
    },
    {
      title: "BANNER POSITION",
      render: (data: IAdvertisementBanner) => (
        <span className="text-xs text-foreground">{data.position}</span>
      ),
    },
    {
      title: "PRODUCT",
      render: (data: IAdvertisementBanner) => (
        <span className="text-xs text-foreground">
          {data.product?.name || "-"}
        </span>
      ),
    },
    {
      title: "ACTIONS",
      render: (data: IAdvertisementBanner) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.ADVERTISE_BANNER}
            name={data?.position as string}
          />
        </div>
      ),
    },
  ];
};
