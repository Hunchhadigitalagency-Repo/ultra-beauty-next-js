import CustomDropdown from "@/components/common/filter/custom-dropdown";
import { updateReturnStatus } from "@/lib/api/return/return-apis";
import React, { useState } from "react";
import { toast } from "sonner";

interface NoDropdown {
  initial_status: string;
  id: number;
}

const NoOrderDropdown = ({ initial_status, id }: NoDropdown) => {

  const [status, setStatus] = useState(initial_status || "Status");

  const options = [
    { name: "Requested", value: "pending" },
    { name: "Approved", value: "approved" },
  ];

  const handleStatusUpdate = async (value: string) => {
    setStatus(value);
    const updateReturn = await updateReturnStatus(value, id);
    toast.success(`Status Updated: ${updateReturn.statusText}`);
  };

  return (
    <CustomDropdown
      defaultValue={status}
      placeholder="Status"
      title_className="w-fit"
      handleChange={handleStatusUpdate}
      getValue={(item) => item.value}
      getLabel={(item) => item.name}
      options={options}
    />
  );
};

export default NoOrderDropdown;
