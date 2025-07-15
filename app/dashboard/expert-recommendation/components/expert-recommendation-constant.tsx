import { AppDispatch } from "@/redux/store";

import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";
import { IExpertRecommendation } from "@/types/cms";

export const ExpertRecommendationConstant = (
  dispatch: AppDispatch
): Col<IExpertRecommendation>[] => {
  return [
    {
      title: "NAME",
      render: (data: IExpertRecommendation) => <span>{data.name}</span>,
    },

    {
      title: "DESIGNATION",
      render: (data: IExpertRecommendation) => <span>{data.designation}</span>,
    },

    {
      title: "COMPANY",
      render: (data: IExpertRecommendation) => <span>{data.company}</span>,
    },

    {
      title: "MESSAGE",
      render: (data: IExpertRecommendation) => <span>{data.message}</span>,
    },

    {
      title: "Action",
      render: (data: IExpertRecommendation) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.EXPERT_RECOMMENDATION}
            name={data?.name as string}
          />
        </div>
      ),
    },
  ];
};
