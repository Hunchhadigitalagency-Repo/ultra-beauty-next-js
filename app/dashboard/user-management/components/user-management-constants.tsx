import React from "react";

import Image from "next/image";
import { Col, } from "@/types/table";
import { IUsers } from "@/types/user-management";
import { formatDateTime } from "@/lib/date-time-utils";
import defauleImage from "@/assets/images.jpeg"
export const UserManagementConstants = (
): Col<IUsers>[] => {
  return [
    {
      title: "FULL NAME",
      render: (data: IUsers) => (
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            {
              data.profile?.profile_picture ? (
                <Image
                  src={
                    data.profile?.profile_picture ||
                    defauleImage
                  }
                  alt={data.first_name + " " + data.last_name}
                  width={24}
                  height={24}
                  className="object-cover w-full h-full"
                />
              )
              : <span className="flex justify-center">{data.first_name.charAt(0)}</span>
            }
          </div>

          <span className="text-xs text-foreground">
            {data.first_name + " " + data.last_name}
          </span>
        </div>
      ),
    },

    {
      title: "EMAIL ADDRESS",
      render: (data: IUsers) => <span>{data.email}</span>,
    },

    {
      title: "ADDRESS",
      render: (data: IUsers) => <span>{data.profile?.address}</span>,
    },
    {
      title: "REGISTER DATE",
      render: (data: IUsers) => (
        <div className="flex w-full justify-start">
          <span>{formatDateTime(data?.date_joined)}</span>
        </div>
      ),
    },

    // {
    //   title: "Actions",
    //   render: (data: IUsers) => (
    //     <div
    //       className="flex gap-2 w-full justify-end"
    //       onClick={(e) => {
    //         e.stopPropagation();
    //         dispatch(setSelectedData(data));
    //       }}
    //     >
    //       <TableActions
    //         data={data}
    //         type={ETypes.USER_MANAGEMENT}
    //         name={(data?.first_name + " " + data?.last_name) as string}
    //       />
    //     </div>
    //   ),
    // },
  ];
};
