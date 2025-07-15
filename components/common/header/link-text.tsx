import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
interface ILinkText {
  title: string;
  href: string;
}

const LinkText = ({ title, href }: ILinkText) => {
  return (
    <Link
      href={href}
      className="text-foreground hover:text-primary text-sm sm:text-base transition-all duration-300 ease-in-out flex items-center gap-2 uppercase"
    >
      {title} <ArrowRight />
    </Link>
  );
};

export default LinkText;
