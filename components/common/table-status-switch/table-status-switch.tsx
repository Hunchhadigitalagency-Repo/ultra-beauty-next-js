"use client";

import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { ETypes } from "@/types/table";
import { updateSubCategory } from "@/lib/api/settings/sub-category-api";
import { updateCategory } from "@/lib/api/settings/category-api";
import { updateBlogCategory } from "@/lib/api/settings/blog-category-api";
import { updateOrderStatus } from "@/lib/api/settings/order-status-api";
import { updateAttribute } from "@/lib/api/settings/attribute-api";
import { updateSection } from "@/lib/api/settings/section-management-api";
import { updateNewsletter } from "@/lib/api/cms/newsletter-api";
import { updateTestimonials } from "@/lib/api/cms/testimonials-api";
import { updateBrand } from "@/lib/api/settings/brand-api";
import { updateReferral } from "@/lib/api/settings/referral-api";
import { updateSocialLink } from "@/lib/api/settings/social-links-api";
import { updateTax } from "@/lib/api/settings/tax-api";
import { updateBanner } from "@/lib/api/cms/banner-api";
import { updatePartnerCompany } from "@/lib/api/cms/partner-company-api";
import { updateCoupons } from "@/lib/api/coupons/coupons-api";
import { updatePreferences } from "@/lib/api/settings/preferences-api";
import { updateSms } from "@/lib/api/cms/sms-api";
import { updateBlog } from "@/lib/api/cms/blogs-api";
import { updateHelpSupport } from "@/lib/api/settings/help-and-support-api";
import { updateCareer } from "@/lib/api/cms/career-api";
import { updateInventoryLocation } from "@/lib/api/settings/inventory-location-api";
import { updateFlashSales } from "@/lib/api/sales/flash-sales-api";
import { updateNavigationInfo } from "@/lib/api/cms/navigation-info-api";
// import { updateFaq } from "@/lib/api/cms/faq-api";
import { updateRolesandPermissions } from "@/lib/api/settings/roles-permissions-api";
import { updateTeam } from "@/lib/api/cms/team-api";

interface Props {
  type: ETypes;
  rowData: any;
  onUpdate?: (data: any) => void; // New prop
}

const TableStatusSwitch = ({ type, rowData, onUpdate }: Props) => {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(rowData.is_active);

  useEffect(() => {
    setActive(rowData.is_active);
  }, [rowData.is_active]);

  const handleToggle = async (checked: boolean) => {
    setLoading(true);
    try {
      let response;
      const formData = new FormData();
      formData.append("is_active", checked.toString());
      switch (type) {
        case ETypes.SUBCATEGORY:
          response = await updateSubCategory(rowData.id, formData);
          break;
        case ETypes.CATEGORY:
          response = await updateCategory(rowData.id, formData);
          break;
        case ETypes.BRAND:
          response = await updateBrand(rowData.id, formData);
          break;
        case ETypes.BLOG_CATEGORY:
          response = await updateBlogCategory(rowData.id, formData);
          break;
        case ETypes.ORDERS:
          response = await updateOrderStatus(rowData.id, formData);
          break;
        case ETypes.REFERRAL:
          response = await updateReferral(rowData.id, formData);
          break;
        case ETypes.SOCIAL_LINKS:
          response = await updateSocialLink(rowData.id, formData);
          break;
        case ETypes.TAX:
          response = await updateTax(rowData.id, {
            ...rowData,
            is_active: !rowData.is_active,
          });
          break;
        case ETypes.INVENTORY_LOCATION:
          response = await updateInventoryLocation(rowData.id, {
            is_active: checked,
          });
          break;
        case ETypes.HELP_AND_SUPPORT:
          response = await updateHelpSupport(rowData.id, formData);
          break;
        case ETypes.ATTRIBUTE:
          response = await updateAttribute(rowData.id, {
            is_active: checked,
          });
          break;
        case ETypes.NAVIGATION_INFO:
          response = await updateNavigationInfo(rowData.id, formData);
          break;
        // case ETypes.FAQ:
        //   response = await updateFaq(rowData.slug, formData);
        //   break;
        case ETypes.SECTION_MANAGEMENT:
          response = await updateSection(rowData.id, formData);
          break;
        case ETypes.NEWSLETTERS:
          response = await updateNewsletter(rowData.id, {
            is_active: checked,
          });
          break;
        case ETypes.TESTIMONIAL:
          response = await updateTestimonials(rowData.slug, formData);
          break;
        case ETypes.BANNERS:
          response = await updateBanner(rowData.id, formData);
          break;
        case ETypes.PARTNER_COMPANY:
          response = await updatePartnerCompany(rowData.id, formData);
          break;
        case ETypes.FLASH_SALES:
          response = await updateFlashSales(rowData.id, formData);
          break;
        case ETypes.COUPON:
          response = await updateCoupons(rowData.id, formData);
          break;
        case ETypes.BLOGS:
          response = await updateBlog(rowData.slug, formData);
          break;
        case ETypes.SMS:
          response = await updateSms(rowData.id, {
            is_active: checked,
          });
          break;
        case ETypes.PREFERENCES:
          response = await updatePreferences(rowData.id, {
            is_active: checked,
          });
          break;
        case ETypes.CAREER:
          response = await updateCareer(rowData.slug, formData);
          break;
        case ETypes.TEAM:
          response = await updateTeam(rowData.id, formData);
          break;
        case ETypes.ROLES:

          const data = {
            role_name: rowData.role,
            is_active: checked,
            users: rowData.user.map((user: any) => user.id)
          }
          response = await updateRolesandPermissions(rowData.id, data)
          break;
        default:
          toast.error("Unsupported type");
          return;
      }

      if (response.status === 200) {
        setActive(checked);
        toast.success("Status updated");
        onUpdate?.({ ...rowData, is_active: checked });
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Switch
      checked={active}
      disabled={loading}
      onCheckedChange={handleToggle}
      className="cursor-pointer"
      id={`status-${rowData.id}`}
    />
  );
};

export default TableStatusSwitch;
