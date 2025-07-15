import { getOutlineStatusColor } from "@/lib/styles-utils";
import React from "react";

interface IStatusCard {
  status: string;
}

const OutlineStatusCard = ({ status }: IStatusCard) => {
  const styles = getOutlineStatusColor(status || "");

  return (
    <div
      className={`w-22 h-7 flex items-center justify-center rounded-full border ${styles} capitalize`}
    >
      {status}
    </div>
  );
};

export default OutlineStatusCard;
