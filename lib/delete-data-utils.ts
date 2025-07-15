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

export const handleDeleteData = async (id: number, type: string) => {
  if (type === ETypes.BRAND) {
    await deleteBrand(id);
  }

  if (type === ETypes.CATEGORY) {
    await deleteCategory(id);
  }

  if (type === ETypes.SUBCATEGORY) {
    await deleteSubCategory(id);
  }

  if (type === ETypes.REFERRAL) {
    await deleteReferral(id);
  }

  if (type === ETypes.SOCIAL_LINKS) {
    await deleteSocialLink(id);
  }

  if (type === ETypes.TAX) {
    await deleteTax(id);
  }

  if (type === ETypes.ADMIN) {
    await deleteAdmin(id);
  }

  if (type === ETypes.ATTRIBUTE) {
    await deleteAttribute(id);
  }

  if (type === ETypes.BLOG_CATEGORY) {
    await deleteBlogCategory(id);
  }

  if (type === ETypes.PARTNER_COMPANY) {
    await deletePartnerCompany(id);
  }

  if (type === ETypes.BLOGS) {
    await deleteBlog(id);
  }

  if (type === ETypes.FAQ) {
    await deleteFaq(id);
  }

  if (type === ETypes.ORDER_STATUS) {
    await deleteOrderStatus(id);
  }

  if (type === ETypes.INVENTORY_LOCATION) {
    await deleteInventoryLocation(id);
  }

  if (type === ETypes.NAVIGATION_INFO) {
    await deleteNavigationInfo(id);
  }

  if (type === ETypes.EXPERT_RECOMMENDATION) {
    await deleteExpertRecommendation(id);
  }

  if (type === ETypes.NEWSLETTERS) {
    await deleteNewsletter(id);
  }

  if (type === ETypes.SMS) {
    await deleteSms(id);
  }

  if (type === ETypes.BANNERS) {
    await deleteBanner(id);
  }

  if (type === ETypes.COUPON) {
    await deleteCoupons(id);
  }

  if (type === ETypes.PRODUCTS) {
    await deleteProduct(id);
  }

  if (type === ETypes.TESTIMONIAL) {
    await deleteTestimonials(id);
  }
};

export const handleDeleteMultipleData = async (ids: number[], type: string) => {
  if (type === ETypes.PRODUCTS) {
    await deleteMultipleProducts(ids);
  }
};
