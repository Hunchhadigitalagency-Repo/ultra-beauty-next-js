import { AppDispatch } from "@/redux/store";

import { Col, ETypes } from "@/types/table";
import TableActions from "@/components/common/table/table-actions";
import { IReferral } from "@/types/Settings";
import { setSelectedData } from "@/redux/features/authentication-slice";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const ReferralConstant = (dispatch: AppDispatch): Col<IReferral>[] => {
  return [
    {
      title: "REFERRAL NAME",
      render: (data: IReferral) => <span>{data.name}</span>,
    },
    {
      title: "REFERRAL POINT AMOUNT",
      render: (data: IReferral) => <span>{data.point_amount}</span>,
    },
    {
      title: "STATUS",
      render: (data: IReferral) => (
        <TableStatusSwitch type={ETypes.REFERRAL} rowData={data} />
      ),
    },
    {
      title: "ACTION",
      render: (data: IReferral) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.REFERRAL}
            name={data?.name as string}
          />
        </div>
      ),
    },
  ];
};
