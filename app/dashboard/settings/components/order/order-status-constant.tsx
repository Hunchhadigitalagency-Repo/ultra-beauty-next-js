import { AppDispatch } from "@/redux/store";

import { Col, ETypes } from "@/types/table";
import TableActions from "@/components/common/table/table-actions";
import { IOrderStatus } from "@/types/Settings";
import { setSelectedData } from "@/redux/features/authentication-slice";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const OrderStatusConstant = (dispatch: AppDispatch, onUpdate: (item: IOrderStatus) => void): Col<any>[] => {
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
        <TableStatusSwitch type={ETypes.ORDERS} rowData={data} onUpdate={onUpdate}/>
      ),
    },
    {
      title: "COLOR",
      render: (data: IOrderStatus) => (
        <div
          style={{ backgroundColor: data.primary_color }}
          className="flex items-center justify-center rounded-full py-1.5"
        >
          <p className=" text-xs" style={{ color: data.text_color }}>
            {data.name}
          </p>
        </div>
      ),
    },
    {
      title: "POSITION",
      render: (data: IOrderStatus) => (
        <div className="flex items-center gap-2">
          <span>{data.position}</span>
        </div>
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
