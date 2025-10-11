import React from "react";
import { Col } from "@/types/table";
import Image from "next/image";
// import { any } from "@/types/cart";
import { Button } from "@/components/ui/button";
import { Trash,  } from "lucide-react";
import { AppDispatch } from "@/redux/store";
import { deleteProductItem } from "@/redux/features/checkout-slice";    

export const CartConstants = (dispatch: AppDispatch): Col<any>[] => {
    return [
        {
            title: "IMAGE",
            render: (data: any) => (
                <Image
                    src={data.image}
                    alt={data.name}
                    width={40}
                    height={40}
                    className="w-16 h-16 object-cover rounded"
                />
            ),
        },
        {
            title: "PRODUCT NAME",
            render: (data: any) => (
                <span className="text-sm font-medium">{data.name}</span>
            ),
        },
        {
            title: "QUANTITY",
            render: (data: any) => (
                <span className="text-sm font-medium">{data.quantity}</span>
            ),
        },
        {
            title: "VARIANTS",
            render: (data: any) => (
                <div className="flex gap-2 mt-1 flex-col">
                    {data?.attribute && data?.attribute?.length > 0 ?
                        data?.attribute?.map((att: any, index: number) => (
                            <div key={index} className="text-[10px] border h-[20px] text-black bg-gray-100 rounded-2xl w-[100px] p-1 flex justify-center items-center">
                                {att.attribute_variant?.name}
                            </div>
                        ))
                        :
                        <div className="text-[14xpx] border h-[20px] text-black bg-gray-100 rounded-2xl w-[100px] p-1 flex justify-center items-center">
                            No variants
                        </div>

                    }
                </div>
            ),
        },
        {
            title: "TOTAL PRICE",
            render: (data: any) => (
                <span className="text-sm font-medium">NPR. {data.currentPrice}</span>
            ),
        },
        {
            title: "REMOVE ITEM",
            render: (data: any) => (
                <div className="flex w-full justify-start">
                    <Button
                        size="sm"
                        className="bg-white hover:bg-none"
                        onClick={() => {
                            dispatch(deleteProductItem(data.slug)); // <-- pass slug, not the whole object
                        }}
                    >
                        <Trash className="w-5 h-5 text-red-600" />
                    </Button>
                </div>
            )
        }

    ];
};
