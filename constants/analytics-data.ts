import RevenueIcon from "@/components/common/icons/revenue-icon";
import SalesIcon from "@/components/common/icons/sales-icon";
import InventoryIcon from "@/components/common/icons/inventory-icon";
import VisitorsIcon from "@/components/common/icons/visitors-icon";

export const statsIcons: Record<string, React.ElementType> = {
    total_orders: RevenueIcon,
    total_revenue: SalesIcon,
    pending_orders: InventoryIcon,
    total_visitors: VisitorsIcon,
};

export const statsTitles: Record<string, string> = {
    total_orders: "Total Orders",
    total_revenue: "Total Revenue",
    pending_orders: "Pending Orders",
    total_visitors: "Total Visitors",
};
export const statsCouponsTitles: Record<string, string> = {
    total_orders: "Total Coupons Used",
    total_revenue: "Total Discount Offered",
    // pending_orders: "Pending Orders",
    // total_visitors: "Total Visitors",
};

export const statsCommissionTitles: Record<string, string> = {
    total_orders: "Commission Earned",
    total_revenue: "Commission Withdrawn",
    pending_orders: "Commission Remaining",
    // total_visitors: "Total Visitors",
};

export const userStatsIcons: Record<string, React.ElementType> = {
    total_orders: RevenueIcon,
    total_sales: SalesIcon,
    total_inventory: InventoryIcon,
    total_visitors: VisitorsIcon,
};

export const userStatsTitles: Record<string, string> = {
    total_earnings: "Total Earnings",
    coupon_promoted: "Coupon Promoted",
    total_used: "Total Used",
    total_sales_quantity: "Total Sales Quantity",
};

export const userManagementIcons: Record<string, React.ElementType> = {
    active_users: RevenueIcon,
    new_users: SalesIcon,
    total_users: InventoryIcon,
    total_reward_points: VisitorsIcon,
};

export const userManagementTitles: Record<string, string> = {
    active_users: "Active Users",
    new_users: "New Users",
    total_users: "Total Users",
    total_reward_points: "Total Reward Points",
};
