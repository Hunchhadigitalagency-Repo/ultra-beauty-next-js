import { AppDispatch } from "@/redux/store";

import { Col, ETypes } from "@/types/table";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { ISubCategory } from "@/types/Settings";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const SubCategoryConstant = (
  dispatch: AppDispatch,
  onUpdate: (item: ISubCategory) => void
): Col<ISubCategory>[] => {
  return [
    {
      title: "SUB CATEGORY NAME",
      render: (data: ISubCategory) => <span>{data.name}</span>,
    },
    {
      title: "CATEGORY NAME",
      render: (data: ISubCategory) => <span>{data.category_name}</span>,
    },
    {
      title: "STATUS",
      render: (data: ISubCategory) => (
        <TableStatusSwitch onUpdate={onUpdate} type={ETypes.SUBCATEGORY} rowData={data} />
      ),
    },
    {
      title: "ACTION",
      render: (data: ISubCategory) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.SUBCATEGORY}
            name={data?.name as string}
          />
        </div>
      ),
    },
  ];
};
