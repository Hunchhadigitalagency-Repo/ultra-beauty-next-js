import React from "react";
import clsx from "clsx";

interface StatusCardProps {
  status: "Delivered" | "Packed" | "Placed" | "Shipped" | string;
}

const statusStyles: Record<string, string> = {
  pending: " text-[#1477B4] border border-[#1477B4]",
  Placed: " text-[#FBBC05] border border-[#FF9900]",
  Shipped: " text-[#00745C] border border-[#01AD89]",
  Delivered: "text-[#40C040] border border-[#40C040]",
  default: " text-gray-600 border border-gray-400",
};

function StatusCard({ status }: StatusCardProps) {
  const style = statusStyles[status] || statusStyles["default"];

  return (
    <div
      className={clsx(
        "text-xs px-3 py-1 rounded-full font-medium capitalize inline-block",
        style
      )}
    >
      {status || "Unknown"}
    </div>
  );
}

export default StatusCard;
