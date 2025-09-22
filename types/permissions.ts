export enum EUserRoles {
  SUPERADMIN = "superadmin",
  ADMIN = "admin",
  USER = "user",
}

export interface IUserPermission {
  id: number;
  name: string;
}

export enum Permissions {
  CAN_READ_DASHBOARD = "can_read_dashboard",

  CAN_READ_PRODUCTS = "can_read_products",
  CAN_WRITE_PRODUCTS = "can_write_products",
  CAN_UPDATE_PRODUCTS = "can_update_products",
  CAN_DELETE_PRODUCTS = "can_delete_products",

  CAN_READ_ORDERS = "can_read_orders",
  CAN_WRITE_ORDERS = "can_write_orders",
  CAN_UPDATE_ORDERS = "can_update_orders",
  CAN_DELETE_ORDERS = "can_delete_orders",

  CAN_READ_SALES = "can_read_sales",
  CAN_WRITE_SALES = "can_write_sales",
  CAN_UPDATE_SALES = "can_update_sales",
  CAN_DELETE_SALES = "can_delete_sales",

  CAN_READ_INVOICES = "can_read_invoices",
  CAN_WRITE_INVOICES = "can_write_invoices",
  CAN_UPDATE_INVOICES = "can_update_invoices",
  CAN_DELETE_INVOICES = "can_delete_invoices",

  CAN_READ_TRANSACTIONS = "can_read_transactions",
  CAN_WRITE_TRANSACTIONS = "can_write_transactions",
  CAN_UPDATE_TRANSACTIONS = "can_update_transactions",
  CAN_DELETE_TRANSACTIONS = "can_delete_transactions",

  CAN_READ_INVENTORY = "can_read_inventory",
  CAN_WRITE_INVENTORY = "can_write_inventory",
  CAN_UPDATE_INVENTORY = "can_update_inventory",
  CAN_DELETE_INVENTORY = "can_delete_inventory",

  CAN_READ_FLASH_SALES = "can_read_flash_sales",
  CAN_WRITE_FLASH_SALES = "can_write_flash_sales",
  CAN_UPDATE_FLASH_SALES = "can_update_flash_sales",
  CAN_DELETE_FLASH_SALES = "can_delete_flash_sales",

  CAN_READ_COUPONS = "can_read_coupons",
  CAN_WRITE_COUPONS = "can_write_coupons",
  CAN_UPDATE_COUPONS = "can_update_coupons",
  CAN_DELETE_COUPONS = "can_delete_coupons",

  CAN_READ_BLOGS = "can_read_blogs",
  CAN_WRITE_BLOGS = "can_write_blogs",
  CAN_UPDATE_BLOGS = "can_update_blogs",
  CAN_DELETE_BLOGS = "can_delete_blogs",

  CAN_READ_CONTACTS = "can_read_contacts",
  CAN_WRITE_CONTACTS = "can_write_contacts",
  CAN_UPDATE_CONTACTS = "can_update_contacts",
  CAN_DELETE_CONTACTS = "can_delete_contacts",

  CAN_READ_PARTNER_COMPANY = "can_read_partner_company",
  CAN_WRITE_PARTNER_COMPANY = "can_write_partner_company",
  CAN_UPDATE_PARTNER_COMPANY = "can_update_partner_company",
  CAN_DELETE_PARTNER_COMPANY = "can_delete_partner_company",

  CAN_READ_FAQS = "can_read_faqs",
  CAN_WRITE_FAQS = "can_write_faqs",
  CAN_UPDATE_FAQS = "can_update_faqs",
  CAN_DELETE_FAQS = "can_delete_faqs",

  CAN_READ_NEWSLETTERS = "can_read_newsletters",
  CAN_WRITE_NEWSLETTERS = "can_write_newsletters",
  CAN_UPDATE_NEWSLETTERS = "can_update_newsletters",
  CAN_DELETE_NEWSLETTERS = "can_delete_newsletters",

  CAN_READ_NOTIFICATIONS = "can_read_notifications",
  CAN_WRITE_NOTIFICATIONS = "can_write_notifications",
  CAN_UPDATE_NOTIFICATIONS = "can_update_notifications",
  CAN_DELETE_NOTIFICATIONS = "can_delete_notifications",

  CAN_READ_SMS = "can_read_sms",
  CAN_WRITE_SMS = "can_write_sms",
  CAN_UPDATE_SMS = "can_update_sms",
  CAN_DELETE_SMS = "can_delete_sms",

  CAN_READ_BANNERS = "can_read_banners",
  CAN_WRITE_BANNERS = "can_write_banners",
  CAN_UPDATE_BANNERS = "can_update_banners",
  CAN_DELETE_BANNERS = "can_delete_banners",

  CAN_READ_NAVIGATION_INFO = "can_read_navigation_info",
  CAN_WRITE_NAVIGATION_INFO = "can_write_navigation_info",
  CAN_UPDATE_NAVIGATION_INFO = "can_update_navigation_info",
  CAN_DELETE_NAVIGATION_INFO = "can_delete_navigation_info",

  CAN_READ_USER_MANAGEMENT = "can_read_user_management",
  CAN_WRITE_USER_MANAGEMENT = "can_write_user_management",
  CAN_UPDATE_USER_MANAGEMENT = "can_update_user_management",
  CAN_DELETE_USER_MANAGEMENT = "can_delete_user_management",

  CAN_READ_TESTIMONIALS = "can_read_testimonials",
  CAN_WRITE_TESTIMONIALS = "can_write_testimonials",
  CAN_UPDATE_TESTIMONIALS = "can_update_testimonials",
  CAN_DELETE_TESTIMONIALS = "can_delete_testimonials",

  CAN_READ_EXPERT_RECOMMENDATIONS = "can_read_expert_recommendations",
  CAN_WRITE_EXPERT_RECOMMENDATIONS = "can_write_expert_recommendations",
  CAN_UPDATE_EXPERT_RECOMMENDATIONS = "can_update_expert_recommendations",
  CAN_DELETE_EXPERT_RECOMMENDATIONS = "can_delete_expert_recommendations",

  CAN_READ_CAREERS = "can_read_careers",
  CAN_WRITE_CAREERS = "can_write_careers",
  CAN_UPDATE_CAREERS = "can_update_careers",
  CAN_DELETE_CAREERS = "can_delete_careers",

  CAN_READ_SETTINGS = "can_read_settings",
  CAN_WRITE_SETTINGS = "can_write_settings",
  CAN_UPDATE_SETTINGS = "can_update_settings",
  CAN_DELETE_SETTINGS = "can_delete_settings",

  CAN_READ_REPORTS = "can_read_reports",
}
