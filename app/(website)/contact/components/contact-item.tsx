import { LucideIcon } from "lucide-react";
import React from "react";

interface ContactItemProps {
  title: string;
  details: string;
  icon: LucideIcon;
}

const ContactItem = ({ title, details, icon }: ContactItemProps) => {
  const Icon = icon;

  return (
    <div className="flex items-center justify-start gap-3 text-center">
      <div className=" p-3 md:p-4 flex justify-center items-center bg-secondary rounded-md">
        <Icon className="text-primary size-6 sm:size-8" />
      </div>
      <div className="flex flex-col justify-center items-start">
        <h4 className="text-xs sm:text-sm font-semibold text-custom-black">
          {title}
        </h4>
        <p className="text-xs sm:text-sm text-custom-black">{details}</p>
      </div>
    </div>
  );
};

export default ContactItem;
