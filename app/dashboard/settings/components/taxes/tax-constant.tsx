import { AppDispatch } from "@/redux/store";

import { Col, ETypes } from "@/types/table";
import TableActions from "@/components/common/table/table-actions";
import { ITaxes } from "@/types/Settings";
import { setSelectedData } from "@/redux/features/authentication-slice";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const TaxConstant = (dispatch: AppDispatch, onupdate:(item: ITaxes) => void): Col<ITaxes>[] => {
  return [
    {
      title: "TAX NAME",
      render: (data: ITaxes) => <span>{data.tax_name}</span>,
    },
    {
      title: "TAX PERCENTAGE",
      render: (data: ITaxes) => <span>{data.tax_percentage}%</span>,
    },
    {
      title: "STATUS",
      render: (data: ITaxes) => (
        <TableStatusSwitch type={ETypes.TAX} rowData={data} onUpdate={onupdate}/>
      ),
    },
    {
      title: "ACTION",
      render: (data: ITaxes) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.TAX}
            name={data?.tax_name as string}
          />
        </div>
      ),
    },
  ];
};
