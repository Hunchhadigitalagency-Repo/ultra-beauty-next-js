import { Files, LayoutDashboardIcon, Settings } from "lucide-react";

export const sidebarData = {
  navMain: [
    {
      title: "Menu",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard/home",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Products",
          url: "/dashboard/products",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Orders",
          url: "/dashboard/orders",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Sales",
          url: "/dashboard/",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Invoices",
          url: "/dashboard/invoices",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Transactions",
          url: "/dashboard/transactions",
          icon: LayoutDashboardIcon,
        },

        {
          title: "Inventory",
          url: "/dashboard",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Flash Sales",
          url: "/dashboard/flash-sales",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Coupons",
          url: "/dashboard/cupons",
          icon: LayoutDashboardIcon,
        },
      ],
    },
    {
      title: "CMS",
      url: "#",
      items: [
        {
          title: "Blogs",
          url: "/dashboard/blogs",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Contacts",
          url: "#",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Partner Company",
          url: "/dashboard/partner-company",
          icon: LayoutDashboardIcon,
        },
        {
          title: "FAQ's",
          url: "/dashboard/faqs",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Newsletters",
          url: "/dashboard/newsletters",
          icon: LayoutDashboardIcon,
        },
        {
          title: "SMS",
          url: "/dashboard/sms",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Banners",
          url: "/dashboard/banners",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Navigation Info",
          url: "/dashboard/navigation-info",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Notification",
          url: "/dashboard/notification",
          icon: LayoutDashboardIcon,
        },
        {
          title: "User Management",
          url: "/dashboard/user-management",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Testimonial",
          url: "/dashboard/testimonials",
          icon: LayoutDashboardIcon,
        },
        {
          title: "Expert Recommendation",
          url: "/dashboard/expert-recommendation",
          icon: LayoutDashboardIcon,
        },
      ],
    },

    {
      title: "Others",
      url: "#",
      items: [
        {
          title: "Settings",
          url: "/dashboard/settings",
          icon: Settings,
        },
        {
          title: "Reports",
          url: "#",
          icon: Files,
        },
      ],
    },
  ],
};
