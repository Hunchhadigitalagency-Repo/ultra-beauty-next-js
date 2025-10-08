import React from "react";
import { Col } from "@/types/table";
import { IApplicant } from "@/types/cms";
import { MdOutlineRemoveRedEye } from "react-icons/md";

export const applicantConstant = (): Col<IApplicant>[] => {
  return [
    {
      title: "NAME",
      render: (data: IApplicant) => <p>{data?.full_name}</p>,
    },

    {
      title: "PHONE",
      render: (data: IApplicant) => <p>{data?.phone_no}</p>,
    },

    {
      title: "EMAIL",
      render: (data: IApplicant) => <p>{data?.email}</p>,
    },

    {
      title: "CV",
      render: (data: IApplicant) => (
        <div className="flex">
          <a
            href={data?.cv}
            target="_blank"
            className="text-[#1477B4] cursor-pointer flex items-center gap-1 text-sm bg-[#EEF9FF] px-4 rounded-full py-1"
          >
            <MdOutlineRemoveRedEye className="text-lg" /> <span>View File</span>
          </a>
        </div>
      ),
    },

    {
      title: "COVER LETTER",
      render: (data: IApplicant) => (
        <div className="flex">
          <a
            href={data?.cover_letter}
            target="_blank"
            className="text-[#1477B4] cursor-pointer flex items-center gap-1 text-sm bg-[#EEF9FF] px-4 rounded-full py-1"
          >
            <MdOutlineRemoveRedEye className="text-lg" /> <span>View File</span>
          </a>
        </div>
      ),
    },
  ];
};
