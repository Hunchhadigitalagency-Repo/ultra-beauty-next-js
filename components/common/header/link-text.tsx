import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
interface ILinkText {
  title: string;
  href: string;
  className?: string;

}

const LinkText = ({ title, href, className }: ILinkText) => {
  return (
    <Link
      href={href}
      className={`text-foreground hover:text-primary text-xs sm:text-sm md:text-base transition-all duration-300 ease-in-out flex items-center gap-1 sm:gap-2 whitespace-nowrap uppercase ${className}`}
    >
      {title}
      <ArrowRight />
    </Link>
  );
};

export default LinkText;
