import React from "react";
import { Col } from "@/types/table";
import Image from "next/image";
import { ICancelProducts } from "@/types/cancel";

export const CancelRequestConstant = (): Col<ICancelProducts>[] => {
  return [
    {
      title: "PRODUCT",
      render: (data: ICancelProducts) => (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={data?.product?.images[0]}
              alt={data?.product?.name}
              width={40}
              height={40}
              className="rounded-md object-cover w-full h-full"
            />
          </div>
          <span className="text-xs text-foreground">{data?.product?.name}</span>
        </div>
      ),
    },

    {
      title: "QUANTITY",
      render: (data: ICancelProducts) => (
        <span className="text-xs flex justify-center md:justify-start">
          {data.quantity}
        </span>
      ),
    },

    // {
    //   title: "VARIETY",
    //   render: (data: ICancelProducts) => (
    //     <div className="flex gap-2 mt-1 flex-col">
    //       {data?.product_variants?.length > 0 ? (
    //         data?.product_variants?.map((att: any, index: number) => (
    //           <div
    //             key={index}
    //             className="text-[10px] border h-[20px] text-black bg-gray-100 rounded-2xl w-[100px] p-1 flex justify-center items-center"
    //           >
    //             {att.attribute_variant?.name}
    //           </div>
    //         ))
    //       ) : (
    //         <div className="text-[10px] border h-[20px] text-black bg-gray-100 rounded-2xl w-[100px] p-1 flex justify-center items-center">
    //           No variants
    //         </div>
    //       )}
    //     </div>
    //   ),
    // },

    // {
    //   title: "USER",
    //   render: (data: ICancelProducts) => (
    //     <div className="flex gap-2">
    //       <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
    //         <Image
    //           src={data?.}
    //           alt={data.user.name}
    //           width={32}
    //           height={32}
    //           className="rounded-full object-cover w-full h-full"
    //         />
    //       </div>
    //       <div>
    //         <div className="text-xs font-medium">
    //           {data.user.name || "User"}
    //         </div>
    //         <div className="text-xs text-muted-foreground">
    //           {data.user.email}
    //         </div>
    //       </div>
    //     </div>
    //   ),
    // },
  ];
};
