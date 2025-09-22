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



export const getTransectionAmount = (data: any[], total_amount: number) => {

  const cash_flow = data?.reduce((acc, value) => {
    return acc + parseFloat(value.amount || "0");
  }, 0);

  const payableAmount = total_amount - cash_flow;

  return payableAmount.toFixed(2);
};
