import { AppDispatch } from "@/redux/store";

import { Col, ETypes } from "@/types/table";
import TableActions from "@/components/common/table/table-actions";
import Image from "next/image";
import { IBrand } from "@/types/Settings";
import { setSelectedData } from "@/redux/features/authentication-slice";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const BrandConstant = (dispatch: AppDispatch,   onUpdate: (data: IBrand) => void // New parameter
): Col<IBrand>[] => {
  return [
    {
      title: "BRAND NAME",
      render: (data: IBrand) => <span>{data.brand_name}</span>,
    },
    {
      title: "BRAND IMAGE",
      render: (data: IBrand) => (
        <Image
          src={data.brand_image}
          alt="brand image"
          height={40}
          width={40}
          className="rounded-sm"
        />
      ),
    },
    {
      title: "STATUS",
      render: (data: IBrand) => (
        <TableStatusSwitch type={ETypes.BRAND} rowData={data} onUpdate={onUpdate} />
      ),
    },
    {
      title: "ACTION",
      render: (data: IBrand) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.BRAND}
            name={data?.brand_name as string}
          />
        </div>
      ),
    },
  ];
};
