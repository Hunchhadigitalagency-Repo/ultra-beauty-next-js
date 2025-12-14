import { ETypes } from "@/types/table";
import { deleteBrand } from "./api/settings/brand-api";
import { deleteCategory } from "./api/settings/category-api";
import { deleteSubCategory } from "./api/settings/sub-category-api";
import { deleteReferral } from "./api/settings/referral-api";
import { deleteSocialLink } from "./api/settings/social-links-api";
import { deleteTax } from "./api/settings/tax-api";
import { deleteAdmin } from "./api/settings/admin-api";
import { deleteAttribute } from "./api/settings/attribute-api";
import { deleteBlogCategory } from "./api/settings/blog-category-api";
import { deletePartnerCompany } from "./api/cms/partner-company-api";
import { deleteBlog } from "./api/cms/blogs-api";
import { deleteFaq } from "./api/cms/faq-api";
import { deleteOrderStatus } from "./api/settings/order-status-api";
import { deleteInventoryLocation } from "./api/settings/inventory-location-api";
import { deleteNavigationInfo } from "./api/cms/navigation-info-api";
import { deleteExpertRecommendation } from "./api/cms/expert-recommendation-api";
import { deleteNewsletter } from "./api/cms/newsletter-api";
import { deleteSms } from "./api/cms/sms-api";
import { deleteBanner } from "./api/cms/banner-api";
import { deleteCoupons } from "./api/coupons/coupons-api";
import { deleteMultipleProducts, deleteProduct } from "./api/menu/products-api";
import { deleteTestimonials } from "./api/cms/testimonials-api";
import { deletePreferences } from "./api/settings/preferences-api";
import { deleteNotification } from "./api/cms/notification-api";
import { deleteRolesandPermissions } from "./api/settings/roles-permissions-api";
import { deleteHelpSupport } from "./api/settings/help-and-support-api";
import { deleteInvoice } from "./api/invoices/invoice-api";
// import { deleteMultipleUsers } from "./api/cms/user-management-api";
import { deleteCareer } from "./api/cms/career-api";
import { deleteFlashSales } from "./api/sales/flash-sales-api";
import { deleteInventoryData } from "./api/inventory/inventory-apis";
import { deleteTransaction } from "./api/transactions/transaction-api";
import { deleteTeam } from "./api/cms/team-api";
import { deleteAdvertiseBanner } from "./api/cms/advertise-banner-apis";

export const handleDeleteData = async (id: number | string, type: string, action?: string | undefined) => {
  console.log('In here and this are the data', type);
  console.log("this is the action", action);
  
  
  if (type === ETypes.BRAND) {
    await deleteBrand(Number(id));
  }

  if (type === ETypes.CATEGORY) {
    await deleteCategory(Number(id));
  }

  if (type === ETypes.SUBCATEGORY) {
    await deleteSubCategory(Number(id));
  }

  if (type === ETypes.REFERRAL) {
    await deleteReferral(Number(id));
  }

  if (type === ETypes.SOCIAL_LINKS) {
    await deleteSocialLink(Number(id));
  }

  if (type === ETypes.TAX) {
    await deleteTax(Number(id));
  }

  if (type === ETypes.ADMIN) {
    await deleteAdmin(Number(id));
  }

  if (type === ETypes.ATTRIBUTE) {
    await deleteAttribute(Number(id));
  }

  if (type === ETypes.BLOG_CATEGORY) {
    await deleteBlogCategory(Number(id));
  }

  if (type === ETypes.PARTNER_COMPANY) {
    await deletePartnerCompany(Number(id));
  }

  if (type === ETypes.BLOGS) {
    await deleteBlog(String(id));
  }

  if (type === ETypes.FAQ) {
    await deleteFaq(id.toString());
  }

  if (type === ETypes.ORDER_STATUS) {
    await deleteOrderStatus(Number(id));
  }

  if (type === ETypes.INVENTORY_LOCATION) {
    await deleteInventoryLocation(Number(id));
  }

  if (type === ETypes.NAVIGATION_INFO) {
    await deleteNavigationInfo(Number(id));
  }

  if (type === ETypes.EXPERT_RECOMMENDATION) {
    await deleteExpertRecommendation(Number(id));
  }

  if (type === ETypes.NEWSLETTERS) {
    await deleteNewsletter(Number(id));
  }

  if (type === ETypes.SMS) {
    await deleteSms(Number(id));
  }

  if (type === ETypes.BANNERS) {
    await deleteBanner(Number(id));
  }

  if (type === ETypes.COUPON) {
    await deleteCoupons(Number(id));
  }

  if (type === ETypes.PRODUCTS) {
    await deleteProduct(String(id));
  }

  if (type === ETypes.TESTIMONIAL) {
    await deleteTestimonials(String(id));
  }

  if (type === ETypes.CAREER) {
    await deleteCareer(String(id));
  }

  if (type === ETypes.PREFERENCES) {
    await deletePreferences(Number(id));
  }

  if (type === ETypes.NOTIFICATION) {
    await deleteNotification(Number(id));
  }

  if (type === ETypes.ROLES) {
    await deleteRolesandPermissions(Number(id));
  }

  if (type === ETypes.HELP_AND_SUPPORT) {
    await deleteHelpSupport(Number(id));
  }

  if (type === ETypes.FLASH_SALES) {
    await deleteFlashSales(Number(id));
  }

  if (type === ETypes.INVOICES) {
    await deleteInvoice(Number(id));
  }

  if (type === ETypes.INVENTORY) {
    console.log('Caling the api now');
    await deleteInventoryData(Number(id), action || '')
  }

  if (type === ETypes.TRANSACTIONS) {
    await deleteTransaction(Number(id))
  }

  if (type === ETypes.TEAM) {
    await deleteTeam(Number(id))
  }

  if (type === ETypes.ADVERTISE_BANNER) {
    await deleteAdvertiseBanner(Number(id))
  }
};

export const handleDeleteMultipleData = async (ids: string[] | number[], type: string) => {
  if (type === ETypes.PRODUCTS) {
    await deleteMultipleProducts(ids);
  }

  // if (type === ETypes.USER_MANAGEMENT) {
  //   await deleteMultipleUsers(ids);
  // }
};