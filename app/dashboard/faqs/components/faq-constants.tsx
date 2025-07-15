
import { AppDispatch } from "@/redux/store";

import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";
import { IFaq } from "@/types/cms";

export const FaqsConstants = (dispatch: AppDispatch): Col<IFaq>[] => {
  return [
    {
      title: "QUESTION",
      render: (data: IFaq) => <span>{data.question}</span>,
    },

    {
      title: "ANSWER",
      render: (data: IFaq) => <span>{data.answer}</span>,
    },

    {
      title: "Action",
      render: (data: IFaq) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.FAQ}
            name={data?.question as string}
          />
        </div>
      ),
    },
  ];
};
