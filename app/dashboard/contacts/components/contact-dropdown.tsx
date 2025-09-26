import CustomDropdown from '@/components/common/filter/custom-dropdown';
import { updateContact } from '@/lib/api/cms/contact-apis';
import React, { useState } from 'react'
import { toast } from 'sonner';

interface NoDropdown {
    initial_status: string
    id: number
}


const ContactStatus = ({ initial_status, id }: NoDropdown) => {


    const [status, setStatus] = useState(
        initial_status?.toLowerCase() || "pending"
    );

    const options = [
        { name: "Pending", value: "pending" },
        { name: "Responded", value: "responded" },
    ];

    const handleStatusUpdate = async (value: string) => {
        setStatus(value);
        const updateReturn = await updateContact(id, value)
        toast.success(`Status Updated: ${updateReturn.statusText} status updated`)
    }

    return (
        <CustomDropdown
            defaultValue={status || "status "}
            placeholder="Status"
            title_className="w-fit"
            handleChange={handleStatusUpdate}
            getValue={(item) => item.value}
            getLabel={(item) => item.name}
            options={options}
        />
    );
}

export default ContactStatus
