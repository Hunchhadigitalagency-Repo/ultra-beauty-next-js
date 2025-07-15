import { AppDispatch } from "@/redux/store";

import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";
import { INavigationInfo } from "@/types/navigation-info";

export const NavigationInfoConstants = (
  dispatch: AppDispatch
): Col<INavigationInfo>[] => {
  return [
    {
      title: "TITLE",
      render: (data: INavigationInfo) => <span>{data.title}</span>,
    },

    {
      title: "DISCOUNT",
      render: (data: INavigationInfo) => (
        <span>{data.discount_percentage}</span>
      ),
    },

    {
      title: "Action",
      render: (data: INavigationInfo) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.NAVIGATION_INFO}
            name={data?.title as string}
          />
        </div>
      ),
    },
  ];
};
