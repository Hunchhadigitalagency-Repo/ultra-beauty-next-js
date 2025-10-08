import React from "react";
import { AppDispatch } from "@/redux/store";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";
import { ICareer } from "@/types/cms";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const careerConstant = (dispatch: AppDispatch,): Col<ICareer>[] => {
  return [
    {
      title: "JOB TITLE",
      render: (data: ICareer) => <span>{data?.job_title}</span>,
    },

    {
      title: "TOTAL APPLICANT",
      render: (data: ICareer) => (
        <div
          className={`${data?.total_applications ? "bg-[#01AD89]" : "bg-[#CE0202]"
            } rounded-full flex items-center justify-center w-8 h-8`}
        >
          <p className="text-white">{data?.total_applications}</p>
        </div>
      ),
    },

    {
      title: "LOCATION",
      render: (data: ICareer) => <span>{data?.location}</span>,
    },

    {
      title: "POSTED DATE",
      render: (data: ICareer) => <span>{data?.end_date}</span>,
    },

    {
      title: "DEADLINE",
      render: (data: ICareer) => <span>{data?.end_date}</span>,
    },

    {
      title: "STATUS",
      render: (data: ICareer) => (
        <div  onClick={(e) => e.stopPropagation()} >
          <TableStatusSwitch type={ETypes.CAREER} rowData={data} />
        </div>
      ),
    },

    {
      title: "Action",
      render: (data: ICareer) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.CAREER}
            name={data?.job_title as string}
          />
        </div>
      ),
    },
  ];
};
