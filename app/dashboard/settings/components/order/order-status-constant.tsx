import { AppDispatch } from "@/redux/store";

import { Col, ETypes } from "@/types/table";
import TableActions from "@/components/common/table/table-actions";
import { IOrderStatus } from "@/types/Settings";
import { setSelectedData } from "@/redux/features/authentication-slice";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const OrderStatusConstant = (dispatch: AppDispatch): Col<any>[] => {
  return [
    {
      title: "ORDER NAME",
      render: (data: IOrderStatus) => (
        <div className="flex items-center gap-2">
          <span>{data.name}</span>
        </div>
      ),
    },
    {
      title: "STATUS",
      render: (data: IOrderStatus) => (
        <TableStatusSwitch type={ETypes.ORDERS} rowData={data} />
      ),
    },
    {
      title: "PRIMARY COLOR",
      render: (data: any) => (
        <span style={{ color: data.primary_color }}>{data.primary_color}</span>
      ),
    },
    {
      title: "TEXT COLOR",
      render: (data: any) => (
        <span style={{ color: data.text_color }}>{data.text_color}</span>
      ),
    },
    {
      title: "ACTION",
      render: (data: IOrderStatus) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.ORDER_STATUS}
            name={data.name}
          />
        </div>
      ),
    },
  ];
};
