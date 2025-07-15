import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getHeaderTitle = (pathname: string) => {
  switch (pathname) {
    case "/dashboard/home":
      return "Dashboard";
    case "/dashboard/products":
      return "Products";
    case "/dashboard/orders":
      return "Orders";
    default:
      return "Dashboard";
  }
};


