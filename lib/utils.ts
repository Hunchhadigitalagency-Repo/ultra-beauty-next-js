import { IOrderLog } from "@/types/orders";
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
  if (err.images || err.image) {
    const errorMessage = (err.images || err.image)?.[0]?.file?.message
    console.log('this is message', errorMessage);

    toast.error(errorMessage);
  }
}

export const allImages = (images: any[], variant: any[]) => {
  const imagess = (variant || [])
    .filter((v: any) => v?.item_image)
    .map((v: any) => ({
      id: v?.id,
      file: v?.item_image,
      file_type: 'image',
    }));

  return [...(images || []), ...imagess];
};


export const generateOrderStatus = (orderStatusLogs: IOrderLog[]) => {
  // Sort logs oldest to newest
  const sorted = [...orderStatusLogs].sort(
    (a, b) => new Date(a.changed_at).getTime() - new Date(b.changed_at).getTime()
  );

  // Initialize status
  const statusMap = {
    processing: 'upcoming',
    packed: 'upcoming',
    shipped: 'upcoming',
    delivered: 'upcoming',
  };

  // Update status based on logs
  sorted.forEach(log => {
    const name = log.status.name.toLowerCase();

    if (name === 'pending') {
      statusMap.processing = 'complete';
    }
    if (name === 'packing') {
      statusMap.processing = 'complete';
      statusMap.packed = 'complete';
    }
    if (name === 'delivering') {
      statusMap.processing = 'complete';
      statusMap.packed = 'complete';
      statusMap.shipped = 'complete';
    }
    if (name === 'delivered') {
      statusMap.processing = 'complete';
      statusMap.packed = 'complete';
      statusMap.shipped = 'complete';
      statusMap.delivered = 'complete';
    }
  });
  const logs = sorted.map((log, index) => {
    const date = new Date(log.changed_at);
    const formattedDate = `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
    return {
      date: formattedDate,
      title: log.status.name,
      isActive: sorted.length - 1 === index,
      reviewLink: log.status.name.toLowerCase() === 'delivered' && index === 0,
    };
  });

  return { logs };
};