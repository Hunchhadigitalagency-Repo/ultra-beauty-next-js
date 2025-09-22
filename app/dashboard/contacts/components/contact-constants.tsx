import DateChips from "@/components/common/chips/date-chips";
import { IContact } from "@/types/cms";
import ContactStatus from "./contact-dropdown";

export const contactConstant = () => {
    return [
        {
            title: "FIRST NAME",
            render: (data: IContact) => <span>{data.firstname}</span>,
        },
        {
            title: "LAST NAME",
            render: (data: IContact) => <span>{data.lastname}</span>,
        },
        {
            title: "EMAIL",
            render: (data: IContact) => <span>{data.email}</span>,
        },
        {
            title: "Contact No.",
            render: (data: IContact) => <span>{data.phoneNumber}</span>,
        },
        {
            title: "SUBJECT",
            render: (data: IContact) => <span>{data.subject}</span>,
        },
        {
            title: "STATUS",
            render: (data: IContact) => <ContactStatus initial_status={data.status} id={data.id} />
        },

        {
            title: "CREATED DATE",
            render: (data: IContact) =>
                <div className="flex justify-center w-full">
                    <DateChips date={data.created_at} />
                </div>
        },

    ];

}