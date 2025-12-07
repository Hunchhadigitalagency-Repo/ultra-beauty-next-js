import React from "react";
import { AppDispatch } from "@/redux/store";
import TableActions from "@/components/common/table/table-actions";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { Col, ETypes } from "@/types/table";
import Image from "next/image";
import { InventoryProducts } from "@/types/product";

export const InventoryTableConstant = (
  dispatch: AppDispatch
): Col<InventoryProducts>[] => {
  return [
    // Product Name + Image
    {
      title: "PRODUCT NAME",
      render: (data: InventoryProducts) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={data?.product?.image || ""}
              alt={data?.product?.name || "Product"}
              width={40}
              height={40}
              className="object-contain h-full w-full"
            />
          </div>
          <span
            className={`font-medium ${data.action.toLowerCase() === "damage"
              ? "text-red-500"
              : "text-gray-800"
              }`}
          >
            {data?.product?.name}
          </span>
        </div>
      ),
    },

    // // Product Category
    // {
    //   title: "PRODUCT CATEGORY",
    //   render: (data: InventoryProducts) => (
    //     <span className="capitalize text-gray-700 font-medium">
    //       {data?.product?.category?.name || "—"}
    //     </span>
    //   ),
    // },

    // // SKU ID
    // {
    //   title: "SKU ID",
    //   render: (data: InventoryProducts) => (
    //     <span className="text-xs text-muted-foreground">
    //       {data?.product?.sku || "—"}
    //     </span>
    //   ),
    // },

    // Quantity with stock highlights
    {
      title: "QUANTITY",
      render: (data: InventoryProducts) => {
        const qty = Math.floor(Math.abs(data?.quantity ?? 0));
        return (
          <span
            className={`font-semibold flex justify-center px-2 py-1 rounded-md ${qty === 0
              ? "bg-red-100 text-red-600"
              : qty < 20
                ? "bg-yellow-100 text-yellow-600"
                : "text-gray-800"
              }`}
          >
            {qty}
          </span>
        );
      },
    },

    // Variety
    {
      title: "VARIETY",
      render: (data: InventoryProducts) =>
        data?.product_variant?.product_variants?.length ? (
          <div className="flex flex-wrap gap-2">
            {data.product_variant.product_variants.map(
              (vari: any, index: number) => (
                <span
                  key={index}
                  className="text-[10px] border h-[20px] bg-gray-100 rounded-2xl px-2 flex justify-center items-center"
                >
                  {vari?.attribute_variant?.name}
                </span>
              )
            )}
          </div>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },

    // Action type (for filtering later)
    {
      title: "ACTION TYPE",
      render: (data: InventoryProducts) => (
        <span className="capitalize">{data?.action}</span>
      ),
    },

    // Attachment
    {
      title: "ATTACHMENT",
      render: (data: InventoryProducts) =>
        data?.attachment ? (
          <a
            href={data.attachment}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors duration-200"
          >
            View
          </a>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },

    // Actions → archive instead of delete
    {
      title: "ACTIONS",
      render: (data: InventoryProducts) => {

        const action = data.action.toLowerCase() === "purchase return" ? "purchase-return" : data.action.toLowerCase()
        console.log('this is the actiopn ', action);

        return (
          <div
            className="flex gap-2 w-full justify-end"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setSelectedData(data));
            }}
          >
            <TableActions
              data={data}
              type={ETypes.INVENTORY}
              name={data?.product?.name}
              action={action}
            // archiveOnly // 👈 ensure TableActions hides delete
            />
          </div>
        )
      },
    },
  ];
};
