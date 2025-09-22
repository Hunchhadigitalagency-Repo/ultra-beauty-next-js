import React from "react";

import { Col } from "@/types/table";
import Image from "next/image";

export const CommissionWithdrawnConstant = (): Col<any>[] => {
    return [
        {
            title: "AMOUNT",
            render: (data: any) => (
                <div className="flex items-center gap-3">
                    <span>{data.amount}</span>
                </div>
            ),
        },
        {
            title: "REMARKS",
            render: (data: any) => <span>{data.remarks}</span>,
        },
        {
            title: "VOUCHER",
            render: (data: any) =>
                <div className="flex items-center gap-3">
                    <Image
                        src={data.voucher}
                        alt={data.name}
                        height={50}
                        width={50}
                        className="rounded-xs"
                    />
                    {/* <span>{data.name}</span> */}
                </div>,
        },
    ];
};
