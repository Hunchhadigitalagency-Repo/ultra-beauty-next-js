import React from "react";

interface SectionHeaderProps {
  title: string;
  description: string;
  className?: string;
  titleClassName?: string;
}

const SectionHeader = ({
  title,
  description,
  className,
  titleClassName,
}: SectionHeaderProps) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <h2 className={`text-2xl lg:text-3xl font-bold text-primary ${titleClassName}`}>
        {title}
      </h2>
      <p className="text-foreground text-sm">{description}</p>
    </div>

  );
};

export default SectionHeader;
