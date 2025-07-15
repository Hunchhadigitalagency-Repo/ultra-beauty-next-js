import { AppDispatch } from "@/redux/store";

import { Col, ETypes } from "@/types/table";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { ISubCategory } from "@/types/Settings";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const SubCategoryConstant = (
  dispatch: AppDispatch
): Col<ISubCategory>[] => {
  return [
    {
      title: "SUB CATEGORY NAME",
      render: (data: ISubCategory) => <span>{data.name}</span>,
    },
    // {
    //   title: "STATUS",
    //   render: (data: ISubCategory) => (
    //     <Switch
    //       checked={data.is_active}
    //       id="activate"
    //       className="cursor-pointer"
    //     />
    //   ),
    // },
    {
      title: "STATUS",
      render: (data: ISubCategory) => (
        <TableStatusSwitch type={ETypes.SUBCATEGORY} rowData={data} />
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
