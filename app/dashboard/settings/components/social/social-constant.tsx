import { AppDispatch } from "@/redux/store";

import { Col, ETypes } from "@/types/table";
import TableActions from "@/components/common/table/table-actions";
import Image from "next/image";
import { ISocial } from "@/types/Settings";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const SocialConstant = (dispatch: AppDispatch): Col<ISocial>[] => {
  console.log(dispatch);
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
        <TableStatusSwitch type={ETypes.SOCIAL_LINKS} rowData={data} />
      ),
    },
    {
      title: "ACTION",
      render: (data: ISocial) => (
        <TableActions data={data} type={ETypes.SOCIAL_LINKS} name={data.name} />
      ),
    },
  ];
};
