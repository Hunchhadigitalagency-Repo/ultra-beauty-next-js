import React from "react";
import { IconType } from "react-icons/lib";

interface SocialLinkProps {
  icon: IconType;
  link: string;
  className?: string;
  iconClassName?: string;
  ariaLabel?: string;
}

const SocialLink = ({
  icon,
  link,
  className,
  iconClassName,
  ariaLabel,
}: SocialLinkProps) => {
  const Icon = icon;

  return (
    <a
      href={link}
      className={`w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200 ${className}`}
      aria-label={`Follow us on ${ariaLabel}`}
      target="_blank"
      rel="noreferrer noopener"
    >
      <Icon className={`size-4 ${iconClassName}`} />
    </a>
  );
};

export default SocialLink;
