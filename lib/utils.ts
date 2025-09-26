import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const getHeaderTitle = (pathname: string) => {

  if (pathname.startsWith("/dashboard/inventory/edit/")) {
    return "Edit Inventory";
  }
  switch (pathname) {
    case "/dashboard/home":
      return "Dashboard";
    case "/dashboard/products":
      return "Products";
    case "/dashboard/products/add-products":
      return "Add Product";
    case "/dashboard/products/edit-products":
      return "Edit Product";
    case "/dashboard/orders":
      return "Orders";
    case "/dashboard/sales":
      return "Sales";
    case "/dashboard/invoices":
      return "Invoice";
    case "/dashboard/transactions":
      return "Transaction";
    case "/dashboard/inventory":
      return "Inventory";
    case "/dashboard/inventory/purchase":
      return "Add Purchase";
    case "/dashboard/inventory/purchase-return":
      return "Add Purchase Return ";
    case "/dashboard/inventory/damage":
      return "Add Damaged";
    // case pathname.startsWith("/dashboard/inventory/"):
    //   return "Edit Inventory";
    case "/dashboard/flash-sales":
      return "Flash Sales";
    case "/dashboard/cupons":
      return "Coupons";
    case "/dashboard/settings":
      return "Settings";
    case "/dashboard/blogs":
      return "Blogs";
    case "/dashboard/partner-company":
      return "Partner Company";
    case "/dashboard/faqs":
      return "FAQ's";
    case "/dashboard/newsletters":
      return "Newsletter";
    case "/dashboard/sms":
      return "SMS";
    case "/dashboard/banners":
      return "Banners";
    case "/dashboard/navigation-info":
      return "Navigation Info";
    case "/dashboard/notification":
      return "Notification";
    case "/dashboard/user-management":
      return "User Management";
    case "/dashboard/testimonials":
      return "Testimonials";
    case "/dashboard/expert-recommendation":
      return "Expert Recommendation";
    case "/dashboard/cancel-request":
      return "Cancelled Orders";
    case "/dashboard/return-request":
      return "Return Requested";
    case "/dashboard/contacts":
      return "Contact";
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



export const handleImageError = (err: any) => {
  if(err.images || err.image){
    const errorMessage = (err.images || err.image)?.[0]?.file?.message
    console.log('this is message', errorMessage);
    
    toast.error(errorMessage);
  }
}
