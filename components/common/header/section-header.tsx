import React from "react";
interface SectionHeaderProps {
  title: string;
  description: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}
const SectionHeader = ({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) => {
  return (
    <div className={`flex flex-col gap-1 sm:gap-2 md:gap-3 ${className}`}>
      <h2 className={`text-2xl lg:text-3xl font-bold text-foreground font-playfair ${titleClassName}`}>
        {title}
      </h2>
      <p className={`text-foreground font-normal text-xs sm:text-sm md:text-base ${descriptionClassName}`}>{description}</p>
    </div>
  );
};
export default SectionHeader;