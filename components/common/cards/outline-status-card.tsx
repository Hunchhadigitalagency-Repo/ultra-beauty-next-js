// import { getOutlineStatusColor } from "@/lib/styles-utils";
import React from "react";

interface IStatusCard {
  status: string;
  primaryColor?: string;
  textColor?: string;
}

const OutlineStatusCard: React.FC<IStatusCard> = ({ status, primaryColor, textColor }) => {
  // const styles = getOutlineStatusColor(status || "");

  return (
    <button
      style={{
        backgroundColor: primaryColor,
        color: textColor,
      }}
      className="w-[100px] rounded-sm py-1 px-2 text-center"
    >
      <p className="text-white">{status}</p>
    </button>
  );
};

export default OutlineStatusCard;
