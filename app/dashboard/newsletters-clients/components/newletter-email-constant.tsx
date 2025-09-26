// ./components/newletter-email-constant.ts
import DateChips from "@/components/common/chips/date-chips";
import { Col } from "@/types/table";

export const NewsletteEmailrConstant = (): Col<any>[] => [
    {
        title: "Email",
        render: (row: any) => <span>{row.email}</span>,
    },
    {
        title: "Subscribed At",
        render: (row: any) => <div className="flex justify-start w-full">
            <DateChips date={row.subscribed_at} />
        </div>
    },
];
