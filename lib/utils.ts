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
  if (pathname.startsWith("/dashboard/orders/single/")) {
    return "Single Orders";
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
    case "/dashboard/orders/add-orders":
      return "Add Orders";
    case "/dashboard/orders/add-orders/shipping":
      return "Shipping";
    case "/dashboard/orders/add-orders/payment":
      return "Payment";
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
    case "/dashboard/flash-sales/add-flash-sales":
      return "Add Flash Sales";
    case "/dashboard/flash-sales/edit-flash-sales":
      return "Edit Flash Sales";
    case "/dashboard/cupons":
      return "Coupons";
    case "/dashboard/cupons/add-coupon":
      return "Add Coupons";
    case "/dashboard/cupons/edit-coupon":
      return "Edit Coupons";
    case "/dashboard/settings":
      return "Settings";
    case "/dashboard/blogs":
      return "Blogs";
    case "/dashboard/blogs/add-blogs":
      return "Add Blogs";
    case "/dashboard/blogs/edit-blogs":
      return "Edit Blogs";
    case "/dashboard/partner-company":
      return "Partner Company";
    case "/dashboard/partner-company/add-partner-company":
      return "Add Partner Company";
    case "/dashboard/partner-company/edit-partner-company":
      return "Edit Partner Company";
    case "/dashboard/faqs":
      return "FAQ's";
    case "/dashboard/faqs/add-faqs":
      return "Add FAQ";
    case "/dashboard/faqs/edit-faqs":
      return "Edit FAQ";
    case "/dashboard/newsletters":
      return "Newsletter";
    case "/dashboard/newsletters/add-newsletters":
      return "Add Newsletter";
    case "/dashboard/newsletters/edit-newsletters":
      return "Edit Newsletter";
    case "/dashboard/sms":
      return "SMS";
    case "/dashboard/sms/add-sms":
      return "Add SMS";
    case "/dashboard/sms/edit-sms":
      return "Edit SMS";
    case "/dashboard/banners":
      return "Banners";
    case "/dashboard/banners/add-banner":
      return "Add Banners";
    case "/dashboard/banners/edit-banner":
      return "Edit Banners";
    case "/dashboard/advertisement":
      return "Advertisement Banners";
    case "/dashboard/advertisement/add-banner":
      return "Add Advertisement Banners";
    case "/dashboard/advertisement/edit-banner":
      return "Edit Advertisement Banners";
    case "/dashboard/navigation-info":
      return "Navigation Info";
    case "/dashboard/navigation-info/add-navigation":
      return "Add Navigation Info";
    case "/dashboard/navigation-info/edit-navigation":
      return "Edit Navigation Info";

    // Notification
    case "/dashboard/notification":
      return "Notification";
    case "/dashboard/notification/add-notification":
      return "Add Notification";
    case "/dashboard/notification/edit-notification":
      return "Edit Notification";

    // User Management
    case "/dashboard/user-management":
      return "User Management";
    case "/dashboard/user-management/add-user-management":
      return "Add User";
    case "/dashboard/user-management/edit-user-management":
      return "Edit User";

    // Testimonials
    case "/dashboard/testimonials":
      return "Testimonials";
    case "/dashboard/testimonials/add-testimonials":
      return "Add Testimonials";
    case "/dashboard/testimonials/edit-testimonials":
      return "Edit Testimonials";

    // Expert Recommendation
    case "/dashboard/expert-recommendation":
      return "Expert Recommendation";
    case "/dashboard/expert-recommendation/add-expert-recommendation":
      return "Add Expert Recommendation";
    case "/dashboard/expert-recommendation/edit-expert-recommendation":
      return "Edit Expert Recommendation";
    case "/dashboard/team":
      return "Team";
    case "/dashboard/team/add-team":
      return "Add Team";
    case "/dashboard/team/edit-team":
      return "Edit Team";
    case "/dashboard/career":
      return "Career";
    case "/dashboard/career/add-career":
      return "Add Career";
    case "/dashboard/career/edit-career":
      return "Edit Career";
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

export const generateClientHash = async (oprKey: string, id: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(oprKey + id);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashBin = String.fromCharCode(...hashArray);

    return btoa(hashBin);  // Base64 encode
};
