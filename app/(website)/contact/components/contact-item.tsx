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
    <div className="flex items-center justify-center flex-col gap-1 text-center px-2">
      <Icon className="text-primary size-6 sm:size-8" />
      <h4 className="text-xs sm:text-sm font-semibold text-custom-black">
        {title}
      </h4>
      <p className="text-xs sm:text-sm text-custom-black">{details}</p>
    </div>
  );
};

export default ContactItem;
