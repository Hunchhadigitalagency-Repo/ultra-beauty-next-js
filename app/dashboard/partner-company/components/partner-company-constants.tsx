import React from "react";

import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";
import { IPartnerCompany } from "@/types/cms";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const PartnerCompanyConstants = (
  dispatch: AppDispatch
): Col<IPartnerCompany>[] => {
  return [
    {
      title: "COMPANY NAME",

      render: (data: IPartnerCompany) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={data.logo || "/placeholder.svg?height=40&width=40"}
              alt={data.name}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>

          <span className="text-xs text-foreground">{data.name}</span>
        </div>
      ),
    },

    // {
    //   title: "LINK",
    //   render: (data: IPartnerCompany) => (
    //     <a
    //       href={data.link}
    //       target="_blank"
    //       rel="noreferrer"
    //       className="hover:underline hover:text-primary hover:underline-offset-4"
    //     >
    //       {data.link}
    //     </a>
    //   ),
    // },

    {
      title: "STATUS",
      render: (data: IPartnerCompany) => (
        <TableStatusSwitch type={ETypes.PARTNER_COMPANY} rowData={data} />
      ),
    },

    {
      title: "Action",
      render: (data: IPartnerCompany) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.PARTNER_COMPANY}
            name={data?.name as string}
          />
        </div>
      ),
    },
  ];
};
