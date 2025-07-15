"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Profile from "./components/profile/Profile-form";
import SubCategoryForm from "./components/sub category/Sub-category-form";
import AttributeForm from "./components/attribute/Attribute-form";
import ApiForm from "./components/api/Api-form";
import AdminForm from "./components/admin/Admin-form";
import TaxesForm from "./components/taxes/taxes-form";
import SeoForm from "./components/seo/Seo-form";
import BillForm from "./components/bill/Bill-form";
import SocialForm from "./components/social/Social-link-form";
import ReferralForm from "./components/referral/Referral-form";
import CategoryTab from "./components/category/Category";
import CategoryForm from "./components/category/category-form";
import AttributeTab from "./components/attribute/Attribute";
import SectionManagement from "./components/sectionManagement/section-management";
import RolesAndPermission from "./components/rolesAndPermissions/roles-and-permissions";
import RolesForm from "./components/rolesAndPermissions/roles-form";
import PreferenceTab from "./components/preferences/preference";
import InventoryForm from "./components/inventory/inventory-location-form";
import SubCategoryTab from "./components/sub category/sub-category";
import ReferralTab from "./components/referral/Referral";
import SocialTab from "./components/social/Social";
import OrderTab from "./components/order/order-status";
import InventoryTab from "./components/inventory/InventoryLocation";
import TaxTab from "./components/taxes/Tax";
import AdminTab from "./components/admin/Admin";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ESettings } from "@/types/table";
import { setActiveSetting } from "@/redux/features/setting-slice";
import BlogCategoryTab from "./components/blogCategory/blog-category";
import BlogCategoryForm from "./components/blogCategory/blog-category-form";
import { settingData } from "@/constants/settings-data";
import { useEffect, useState } from "react";
import { getCompanyProfile } from "@/lib/api/settings/profile-api";
import { handleError } from "@/lib/error-handler";
import { toast } from "sonner";
import { setSelectedData } from "@/redux/features/authentication-slice";
import { setSearchQuery } from "@/redux/features/filter-slice";
import BrandTab from "./components/brand/brand";
import BrandForm from "./components/brand/brand-form";
import OrderStatusForm from "./components/order/order-status-form";
import PreferenceForm from "./components/preferences/preference-form";
import { getBill } from "@/lib/api/settings/bill-api";

export default function Settings() {
  const activeSetting = useAppSelector((state) => state.setting.activeSetting);
  const dispatch = useAppDispatch();
  const selectedData = useAppSelector(
    (state) => state.authentication.selectedData
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getCompanyProfile();

        if (response.status === 200 && response.data) {
          dispatch(setSelectedData(response.data));
        }
      } catch (error) {
        handleError(error, toast);
      } finally {
        setLoading(false);
      }
    };
    const fetchBill = async () => {
      try {
        setLoading(true);
        const response = await getBill();

        if (response.status === 200 && response.data) {
          dispatch(setSelectedData(response.data[0]));
          setLoading(true);
        }
      } catch (error) {
        handleError(error, toast);
      } finally {
        setLoading(false);
      }
    };

    if (activeSetting === ESettings.PROFILE) {
      fetchProfile();
    }
    if (activeSetting === ESettings.BILLINGS) {
      fetchBill();
    }
  }, [activeSetting, dispatch]);

  function renderSettingComponent() {
    switch (activeSetting) {
      case ESettings.PROFILE:
        return loading ? (
          <div className="h-[80vh] flex items-center justify-center">
            <p className="text-lg">Loading Profile...</p>
          </div>
        ) : (
          <Profile initialData={selectedData} />
        );
      case ESettings.CATEGORY:
        return <CategoryTab />;
      case ESettings.EDIT_CATEGORY:
        return <CategoryForm initialData={selectedData} />;
      case ESettings.ADD_CATEGORY:
        return <CategoryForm initialData={null} />;
      case ESettings.BLOG_CATEGORY:
        return <BlogCategoryTab />;
      case ESettings.ADD_BLOG_CATEGORY:
        return <BlogCategoryForm initialData={null} />;
      case ESettings.EDIT_BLOG_CATEGORY:
        return <BlogCategoryForm initialData={selectedData} />;
      case ESettings.SUB_CATEGORY:
        return <SubCategoryTab />;
      case ESettings.ADD_SUB_CATEGORY:
        return <SubCategoryForm initialData={null} />;
      case ESettings.EDIT_SUB_CATEGORY:
        return <SubCategoryForm initialData={selectedData} />;
      case ESettings.BRAND:
        return <BrandTab />;
      case ESettings.ADD_BRAND:
        return <BrandForm initialData={null} />;
      case ESettings.EDIT_BRAND:
        return <BrandForm initialData={selectedData} />;
      case ESettings.ATTRIBUTES:
        return <AttributeTab />;
      case ESettings.ADD_ATTRIBUTE:
        return <AttributeForm initialData={null} />;
      case ESettings.EDIT_ATTRIBUTE:
        return <AttributeForm initialData={selectedData} />;
      case ESettings.API_KEYS:
        return <ApiForm initialData={null} />;
      case ESettings.REFERRAL:
        return <ReferralTab />;
      case ESettings.ADD_REFERRAL:
        return <ReferralForm initialData={null} />;
      case ESettings.EDIT_REFERRAL:
        return <ReferralForm initialData={selectedData} />;
      case ESettings.SECTION_MANAGEMENT:
        return <SectionManagement />;
      case ESettings.SOCIAL_LINKS:
        return <SocialTab />;
      case ESettings.ADD_SOCIAL_LINKS:
        return <SocialForm initialData={null} />;
      case ESettings.EDIT_SOCIAL_LINKS:
        return <SocialForm initialData={selectedData} />;
      case ESettings.ROLES:
        return <RolesAndPermission />;
      case ESettings.ADD_ROLE:
        return <RolesForm initialData={null} />;
      case ESettings.EDIT_ROLE:
        return <RolesForm initialData={selectedData} />;
      case ESettings.ORDER_STATUS:
        return <OrderTab />;
      case ESettings.ADD_ORDER_STATUS:
        return <OrderStatusForm initialData={null} />;
      case ESettings.EDIT_ORDER_STATUS:
        return <OrderStatusForm initialData={selectedData} />;
      case ESettings.PREFERENCES:
        return <PreferenceTab />;
      case "Add Preferences":
        return <PreferenceForm initialData={null} />;
      case ESettings.BILLINGS:
        return loading ? (
          <div className="h-[80vh] flex items-center justify-center">
            <p className="text-lg">Loading Bill Details...</p>
          </div>
        ) : (
          <BillForm initialData={selectedData} />
        );
      case ESettings.SEO:
        return <SeoForm />;
      case ESettings.INVENTORY_LOCATION:
        return <InventoryTab />;
      case ESettings.ADD_INVENTORY_LOCATION:
        return <InventoryForm initialData={null} />;
      case ESettings.EDIT_INVENTORY_LOCATION:
        return <InventoryForm initialData={selectedData} />;
      case ESettings.TAXES:
        return <TaxTab />;
      case ESettings.ADD_TAX:
        return <TaxesForm initialData={null} />;
      case ESettings.EDIT_TAX:
        return <TaxesForm initialData={selectedData} />;
      case ESettings.ADMIN_USERS:
        return <AdminTab />;
      case ESettings.ADD_ADMIN:
        return <AdminForm initialData={null} />;
      case ESettings.EDIT_ADMIN:
        return <AdminForm initialData={selectedData} />;
    }
  }

  return (
    <div className=" grid grid-col-1 md:grid-cols-[1fr_3fr] gap-4">
      <Card className="border-none shadow-none p-0 rounded-sm sm:h-[calc(100vh-100px)] ">
        <CardContent className="p-0 ">
          <h2 className="text-lg font-semibold pl-8 py-4">Settings</h2>
          <nav className="flex sm:flex-col w-[calc(100vw-50px)] sm:w-full gap-2 pl-6 overflow-x-auto md:overflow-y-auto sm:h-[calc(100vh-180px)] ">
            {settingData.map((setting) => (
              <Button
                key={setting.data}
                variant="ghost"
                onClick={() => {
                  dispatch(setActiveSetting(setting.data));
                  dispatch(setSearchQuery(""));
                }}
                className={cn(
                  "justify-between text-sm font-medium hover:text-primary cursor-pointer",
                  activeSetting === setting.data
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <span>{setting.title}</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            ))}
          </nav>
        </CardContent>
      </Card>
      <div className=" h-[calc(100vh-100px)] overflow-y-auto">
        {renderSettingComponent()}
      </div>
    </div>
  );
}
