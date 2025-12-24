import { SidebarItems } from "@/types/sidebar-items";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart,
  FileText,
  Wallet,
  Boxes,
  Zap,
  Ticket,
  Newspaper,
  Phone,
  Building2,
  HelpCircle,
  Mail,
  MessageSquare,
  Image,
  Compass,
  Bell,
  Users,
  Quote,
  Star,
  Briefcase,
  Settings,
  Files,
  X,
  Undo,
  Popcorn,
  Info,
  Group,
} from "lucide-react";

export const sidebarData = {
  navMain: [
    {
      title: "Menu",
      url: "#",
      items: [
        {
          title: SidebarItems.DASHBOARD,
          url: "/dashboard/home",
          icon: LayoutDashboard,
        },
        {
          title: SidebarItems.PRODUCTS,
          url: "/dashboard/products",
          icon: Package,
        },
        {
          title: SidebarItems.ORDERS,
          url: "/dashboard/orders",
          icon: ShoppingCart,
        },
        {
          title: SidebarItems.SALES,
          url: "/dashboard/sales",
          icon: BarChart,
        },
        {
          title: SidebarItems.INVOICES,
          url: "/dashboard/invoices",
          icon: FileText,
        },
        {
          title: SidebarItems.TRANSACTIONS,
          url: "/dashboard/transactions",
          icon: Wallet,
        },
        {
          title: SidebarItems.CANCEL_ITEMS,
          url: "/dashboard/cancel-request",
          icon: X,
        },
        {
          title: SidebarItems.RETURN_ITEMS,
          url: "/dashboard/return-request",
          icon: Undo,
        },
        {
          title: SidebarItems.INVENTORY,
          url: "/dashboard/inventory",
          icon: Boxes,
        },
        {
          title: SidebarItems.FLASH_SALES,
          url: "/dashboard/flash-sales",
          icon: Zap,
        },
        {
          title: SidebarItems.COUPONS,
          url: "/dashboard/cupons",
          icon: Ticket,
        },
      ],
    },
    {
      title: "CMS",
      url: "#",
      items: [
        {
          title: SidebarItems.BLOGS,
          url: "/dashboard/blogs",
          icon: Newspaper,
        },
        {
          title: SidebarItems.CONTACTS,
          url: "/dashboard/contacts",
          icon: Phone,
        },
        // {
        //   title: SidebarItems.PARTNER_COMPANY,
        //   url: "/dashboard/partner-company",
        //   icon: Building2,
        // },
        {
          title: SidebarItems.FAQS,
          url: "/dashboard/faqs",
          icon: HelpCircle,
        },
        {
          title: SidebarItems.ADVERTISMENT,
          url: "/dashboard/advertisement",
          icon: Image,
        },
        {
          title: SidebarItems.NEWSLETTERS,
          url: "/dashboard/newsletters",
          icon: Mail,
        },
        {
          title: SidebarItems.NEWSLETTERS_CLIENTS,
          url: "/dashboard/newsletters-clients",
          icon: Info,
        },
        // {
        //   title: SidebarItems.SMS,
        //   url: "/dashboard/sms",
        //   icon: MessageSquare,
        // },
        {
          title: SidebarItems.BANNERS,
          url: "/dashboard/banners",
          icon: Image,
        },
        // {
        //   title: SidebarItems.NAVIGATION_INFO,
        //   url: "/dashboard/navigation-info",
        //   icon: Compass,
        // },
        {
          title: SidebarItems.NOTIFICATION,
          url: "/dashboard/notification",
          icon: Bell,
        },
        {
          title: SidebarItems.TEAM,
          url: "/dashboard/team",
          icon: Group,
        },
        {
          title: SidebarItems.USER_MANAGEMENT,
          url: "/dashboard/user-management",
          icon: Users,
        },
        // {
        //   title: SidebarItems.TESTIMONIALS,
        //   url: "/dashboard/testimonials",
        //   icon: Quote,
        // },
        // {
        //   title: SidebarItems.EXPERT_RECOMMENDATIONS,
        //   url: "/dashboard/expert-recommendation",
        //   icon: Star,
        // },
        // {
        //   title: SidebarItems.CAREERS,
        //   url: "/dashboard/career",
        //   icon: Briefcase,
        // },
      ],
    },

    {
      title: "Others",
      url: "#",
      items: [
        {
          title: SidebarItems.SETTINGS,
          url: "/dashboard/settings",
          icon: Settings,
        },
        {
          title: SidebarItems.REPORTS,
          url: "#",
          icon: Files,
          update: 'Available in Version 2.0'
        },
      ],
    },
  ],
};