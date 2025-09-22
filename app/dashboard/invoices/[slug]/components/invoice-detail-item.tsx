import React from "react";

interface InvoiceDetailItemProps {
  title: string;
  value: string | React.ReactNode;
}

const InvoiceDetailItem = ({ title, value }: InvoiceDetailItemProps) => {
  return (
    <div className="flex items-center gap-4 w-auto sm:w-[350px]">
      <h4 className="text-accent-foreground font-medium text-sm capitalize w-40">
        {title}
      </h4>
      {typeof value === "string" ? (
        <h3 className="text-foreground text-sm font-medium ">{value}</h3>
      ) : (
        value
      )}
    </div>
  );
};

export default InvoiceDetailItem;
