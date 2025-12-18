export interface Col<T> {
  title: string | React.ReactNode;
  render: (item: T) => React.ReactNode;
}

export enum ETypes {
  PRODUCTS = "products",
  CATEGORY = "category",
  BLOG_CATEGORY = "blogcategory",
  SUBCATEGORY = "subcategory",
  BRAND = "brand",
  REFERRAL = "referral",
  ORDERS = "orders",
  INVENTORY_LOCATION = "inventory-location",
  TAX = "tax",
  ADMIN = "admin",
  TRANSACTIONS = "transactions",
  INVOICES = "invoices",
  ROLES = "roles",
  ATTRIBUTE = "attribute",
  SOCIAL_LINKS = "social-links",
  BLOGS = "blogs",
  PARTNER_COMPANY = "partner-company",
  FAQ = "faq",
  BANNERS = "banners",
  ADVERTISE_BANNER = "advertise-banner",
  NOTIFICATION = "notification",
  SECTION_MANAGEMENT = "section-management",
  ORDER_STATUS = "order-status",
  NEWSLETTERS = "newsletters",
  SMS = "sms",
  NAVIGATION_INFO = "navigation-info",
  EXPERT_RECOMMENDATION = "expert-recommendation",
  TESTIMONIAL = "testimonial",
  COUPON = "coupon",
  FLASH_SALES = "flash-sales",
  SALES = "sales",
  USER_MANAGEMENT = "user-management",
  PREFERENCES = "preferences",
  HELP_AND_SUPPORT = "help-and-support",
  PRIVACY_POLICY = "privacy-policy",
  TERMS_AND_CONDITION = "terms-and-condition",
  CAREER = "career",
  APPLICANT = "applicant",
  INVENTORY = "inventory",
  BEST_SELLER = "best_seller",
  CANCEL_REQUEST = "cancel_request",
  RETURN_REQUEST = "return_request",
  TEAM = "team"
}

export enum ESettings {
  PROFILE = "profile",

  CATEGORY = "category",
  ADD_CATEGORY = "add-category",
  EDIT_CATEGORY = "edit-category",

  SUB_CATEGORY = "sub-category",
  ADD_SUB_CATEGORY = "add-sub-category",
  EDIT_SUB_CATEGORY = "edit-sub-category",

  BLOG_CATEGORY = "blog-category",
  ADD_BLOG_CATEGORY = "add-blog-category",
  EDIT_BLOG_CATEGORY = "edit-blog-category",

  BRAND = "brand",
  ADD_BRAND = "add-brand",
  EDIT_BRAND = "edit-brand",

  ATTRIBUTES = "attributes-and-variation",
  ADD_ATTRIBUTE = "add-attribute-and-variation",
  EDIT_ATTRIBUTE = "edit-attribute-and-variation",

  API_KEYS = "api-keys",

  REFERRAL = "referral",
  ADD_REFERRAL = "add-referral",
  EDIT_REFERRAL = "edit-referral",

  SECTION_MANAGEMENT = "section-management",

  SOCIAL_LINKS = "social-links",
  ADD_SOCIAL_LINKS = "add-social-links",
  EDIT_SOCIAL_LINKS = "edit-social-links",

  ROLES = "roles-and-permission",
  ADD_ROLE = "add-roles-and-permission",
  EDIT_ROLE = "edit-roles-and-permission",

  ORDER_STATUS = "order-status",
  ADD_ORDER_STATUS = "add-order-status",
  EDIT_ORDER_STATUS = "edit-order-status",

  PREFERENCES = "preferences",
  ADD_PREFERENCES = "add-preferences",
  EDIT_PREFERENCES = "edit-preferences",

  BILLINGS = "billings",

  SEO = "seo",

  INVENTORY_LOCATION = "inventory-location",
  ADD_INVENTORY_LOCATION = "add-inventory-location",
  EDIT_INVENTORY_LOCATION = "edit-inventory-location",

  TAXES = "taxes",
  ADD_TAX = "add-taxes",
  EDIT_TAX = "edit-taxes",

  ADMIN_USERS = "admin-users",
  ADD_ADMIN = "add-admin-users",
  EDIT_ADMIN = "edit-admin-users",

  HELP_AND_SUPPORT = "help-and-support",
  ADD_HELP_AND_SUPPORT = "add-help and Support",
  EDIT_HELP_AND_SUPPORT = "edit-help-and-Support",

  PRIVACY_POLICY = "privacy-policy",
  ADD_PRIVACY_POLICY = "add-privacy-policy",
  EDIT_PRIVACY_POLICY = "edit-privacy-policy",

  TERMS_AND_CONDITION = "terms-and-condition",
  ADD_TERMS_AND_CONDITION = "add-terms-and-condition",
  EDIT_TERMS_AND_CONDITION = "edit-terms-and-condition",
}

export enum EPages {
}

export const ESecure: Record<string, boolean> = {
  [ETypes.USER_MANAGEMENT]: true,
  [ETypes.INVENTORY]: true,
  [ETypes.INVOICES]: true,
};
