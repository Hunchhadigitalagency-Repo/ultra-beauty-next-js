import { AppDispatch } from "@/redux/store";

import { Col, ETypes } from "@/types/table";
import TableActions from "@/components/common/table/table-actions";
import Image from "next/image";
import { IHelpAndSupport } from "@/types/Settings";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";
import { setSelectedData } from "@/redux/features/authentication-slice";

export const HelpAndSupportConstant = (
  dispatch: AppDispatch,
  onUpdate:(item: IHelpAndSupport) => void
): Col<IHelpAndSupport>[] => {
  return [
    {
      title: "HELP AND SUPPORT",
      render: (data: IHelpAndSupport) => (
        <div className="flex items-center gap-2">
          <Image
            src={data.icon}
            alt={data.name}
            height={30}
            width={30}
            className=" h-9 w-9 rounded-full"
          />
          <span>{data.name}</span>
        </div>
      ),
    },

    {
      title: "STATUS",
      render: (data: IHelpAndSupport) => (
        <TableStatusSwitch type={ETypes.HELP_AND_SUPPORT} onUpdate={onUpdate} rowData={data} />
      ),
    },
    {
      title: "ACTION",
      render: (data: IHelpAndSupport) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.HELP_AND_SUPPORT}
            name={data.name}
          />
        </div>
      ),
    },
  ];
};
