import { AppDispatch } from "@/redux/store";

import { Col, ETypes } from "@/types/table";
import TableActions from "@/components/common/table/table-actions";
import Image from "next/image";
import { ISocial } from "@/types/Settings";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";
import { setSelectedData } from "@/redux/features/authentication-slice";

export const SocialConstant = (dispatch: AppDispatch, onUpdate: (item: ISocial) => void): Col<ISocial>[] => {
  return [
    {
      title: "SOCIAL NAME",
      render: (data: ISocial) => (
        <div className="flex items-center gap-2">
          <Image
            src={data.icon}
            alt={data.name}
            height={30}
            width={30}
            className="rounded-full"
          />
          <span>{data.name}</span>
        </div>
      ),
    },
    {
      title: "SOCIAL LINK",
      render: (data: ISocial) => <span>{data.url}</span>,
    },
    {
      title: "STATUS",
      render: (data: ISocial) => (
        <TableStatusSwitch type={ETypes.SOCIAL_LINKS} rowData={data} onUpdate={onUpdate}/>
      ),
    },
    {
      title: "ACTION",
      render: (data: ISocial) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.SOCIAL_LINKS}
            name={data.name}
          />
        </div>
      ),
    },
  ];
};
