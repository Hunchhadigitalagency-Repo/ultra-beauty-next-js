import React from "react";
import Image from "next/image";
import { AppDispatch } from "@/redux/store";
import { Col, ETypes } from "@/types/table";
import { setSelectedData } from "@/redux/features/authentication-slice";
import TableActions from "@/components/common/table/table-actions";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";
import { ITeam } from "@/types/cms";

export const TeamConstants = (dispatch: AppDispatch): Col<ITeam>[] => {
  return [
    {
      title: "NAME",
      render: (data: ITeam) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={
                typeof data.photo === "string"
                  ? data.photo
                  : "/placeholder.svg?height=40&width=40"
              }
              alt={data.name}
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-xs text-foreground">{data.name}</span>
        </div>
      ),
    },
    {
      title: "DESIGNATION",
      render: (data: ITeam) => <span>{data.designation}</span>,
    },
    {
      title: "DESCRIPTION",
      render: (data: ITeam) => (
        <span className="line-clamp-2 text-xs text-muted-foreground">
          {data.description}
        </span>
      ),
    },
    {
      title: "STATUS",
      render: (data: ITeam) => (
        <TableStatusSwitch type={ETypes.TEAM} rowData={data} />
      ),
    },

    {
      title: "ACTION",
      render: (data: ITeam) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions data={data} type={ETypes.TEAM} name={data.name} />
        </div>
      ),
    },
  ];
};
