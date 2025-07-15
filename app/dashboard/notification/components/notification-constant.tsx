import { AppDispatch } from "@/redux/store";

import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";
import { INotification } from "@/types/cms";

export const NotificationConstants = (
  dispatch: AppDispatch
): Col<INotification>[] => {
  return [
    {
      title: "TITLE",
      render: (data: INotification) => <span>{data.title}</span>,
    },

    {
      title: "DESCRIPTION",
      render: (data: INotification) => <span>{data.description}</span>,
    },

    {
      title: "Action",
      render: (data: INotification) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.NOTIFICATION}
            name={data?.title as string}
          />
        </div>
      ),
    },
  ];
};
