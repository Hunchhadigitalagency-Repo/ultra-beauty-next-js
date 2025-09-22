import { AppDispatch } from "@/redux/store";
import { Col, ETypes } from "@/types/table";
import TableActions from "@/components/common/table/table-actions";
import { IInventory } from "@/types/Settings";
import { setSelectedData } from "@/redux/features/authentication-slice";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const InventoryConstant = (dispatch: AppDispatch, onUpdate: (item: IInventory) => void): Col<IInventory>[] => {
  return [
    {
      title: "INVENTORY NAME",
      render: (data: IInventory) => <span>{data.inventory_name}</span>,
    },
    {
      title: "INVENTORY ADDRESS",
      render: (data: IInventory) => <span>{data.inventory_address}</span>,
    },
    {
      title: "STATUS",
      render: (data: IInventory) => (
        <TableStatusSwitch type={ETypes.INVENTORY_LOCATION} rowData={data} onUpdate={onUpdate} />
      ),
    },
    {
      title: "ACTION",
      render: (data: IInventory) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.INVENTORY_LOCATION}
            name={data?.inventory_name as string}
          />
        </div>
      ),
    },
  ];
};
