import { AppDispatch } from "@/redux/store";

import { Col, ETypes } from "@/types/table";
import TableActions from "@/components/common/table/table-actions";
import Image from "next/image";
import { IAdmin } from "@/types/Settings";
import { setSelectedData } from "@/redux/features/authentication-slice";

import defaultProfile from "@/assets/images.jpeg"

export const AdminConstant = (dispatch: AppDispatch): Col<IAdmin>[] => {
  return [
    {
      title: "ADMIN NAME",
      render: (data: IAdmin) => (
        <div className="flex items-center gap-2">
          <Image
            src={
              data?.profile?.profile_picture || defaultProfile
            }
            alt={data.first_name}
            height={30}
            width={30}
            className=" h-8 w-8 rounded-full"
          />
          <span>
            {data.first_name} {data.last_name}
          </span>
        </div>
      ),
    },

    {
      title: "ADMIN EMAIL",
      render: (data: IAdmin) => <span>{data.email}</span>,
    },
    {
      title: "ACTION",
      render: (data: IAdmin) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.ADMIN}
            name={data.first_name}
          />
        </div>
      ),
    },
  ];
};
