
import { getBackgroundStatusColor } from "@/lib/styles-utils";
import React from "react";

const BackgroundStatusCard = ({ status }: { status: string }) => {
  const styles = getBackgroundStatusColor(status || "");
  return (
    <div
      className={`w-[90px] h-7 flex items-center justify-center text-xs text-white ${styles}`}
    >
      <span>{status}</span>
    </div>
  );
};

export default BackgroundStatusCard;
