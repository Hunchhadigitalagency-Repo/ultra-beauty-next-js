import React from "react";

import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";
import { ITestimonial } from "@/types/cms";
import RatingStars from "@/components/common/product/rating-stars";
import TableStatusSwitch from "@/components/common/table-status-switch/table-status-switch";

export const TestimonialsConstants = (
  dispatch: AppDispatch,
): Col<ITestimonial>[] => {
  return [
    {
      title: "NAME",
      render: (data: ITestimonial) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={data.image || "/placeholder.svg?height=40&width=40"}
              alt={data.name}
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-xs text-foreground">{data.name}</span>
        </div>
      ),
    },

    {
      title: "DESIGNATION",
      render: (data: ITestimonial) => <span>{data.designation}</span>,
    },

    {
      title: "COMPANY",
      render: (data: ITestimonial) => <span>{data.company}</span>,
    },

    {
      title: "RATING",
      render: (data: ITestimonial) => <RatingStars rating={data.rating} />,
    },

    {
      title: "STATUS",
      render: (data: ITestimonial) => (
        <TableStatusSwitch type={ETypes.TESTIMONIAL} rowData={data} />
      ),
    },

    {
      title: "ACTION",
      render: (data: ITestimonial) => (
        <div
          className="flex gap-2 w-full justify-end"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedData(data));
          }}
        >
          <TableActions
            data={data}
            type={ETypes.TESTIMONIAL}
            name={data?.name as string}
          />
        </div>
      ),
    },
  ];
};
