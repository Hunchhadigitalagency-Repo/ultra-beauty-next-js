"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ESettings } from "@/types/table";
import { Permissions } from "@/types/permissions";
import { handleError } from "@/lib/error-handler";
import { getSeo } from "@/lib/api/settings/seo-api";
import { getBill } from "@/lib/api/settings/bill-api";
import { settingData } from "@/constants/settings-data";
import { withPermissions } from "@/hoc/withPermissions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearchQuery } from "@/redux/features/filter-slice";
import { setActiveSetting } from "@/redux/features/setting-slice";
import { getCompanyProfile } from "@/lib/api/settings/profile-api";
import { getPrivacyPolicy } from "@/lib/api/settings/privacy-policy-api";
import { getTermsAndCondition } from "@/lib/api/settings/terms-and-condition";

import TaxTab from "./components/taxes/Tax";
import AdminTab from "./components/admin/Admin";
import ApiForm from "./components/api/Api-form";
import SeoForm from "./components/seo/Seo-form";
import BrandTab from "./components/brand/brand";
import SocialTab from "./components/social/Social";
import BillForm from "./components/bill/Bill-form";
import AdminForm from "./components/admin/Admin-form";
import TaxesForm from "./components/taxes/taxes-form";
import BrandForm from "./components/brand/brand-form";
import OrderTab from "./components/order/order-status";
import Profile from "./components/profile/Profile-form";
import CategoryTab from "./components/category/Category";
import ReferralTab from "./components/referral/Referral";
import AttributeTab from "./components/attribute/Attribute";
import SocialForm from "./components/social/Social-link-form";
import ReferralForm from "./components/referral/Referral-form";
import CategoryForm from "./components/category/category-form";
import PreferenceTab from "./components/preferences/preference";
import AttributeForm from "./components/attribute/Attribute-form";
import OrderStatusForm from "./components/order/order-status-form";
import SubCategoryTab from "./components/sub category/sub-category";
import RolesForm from "./components/rolesAndPermissions/roles-form";
import InventoryTab from "./components/inventory/InventoryLocation";
import BlogCategoryTab from "./components/blogCategory/blog-category";
import PreferenceForm from "./components/preferences/preference-form";
import SubCategoryForm from "./components/sub category/Sub-category-form";
import InventoryForm from "./components/inventory/inventory-location-form";
import BlogCategoryForm from "./components/blogCategory/blog-category-form";
import HelpAndSupportTab from "./components/help-and-support/help-and-support";
import PrivacyPolicyForm from "./components/privacy-policy/privacy-policy-form";
import SectionManagement from "./components/sectionManagement/section-management";
import HelpAndSupportForm from "./components/help-and-support/help-and-support-form";
import RolesAndPermission from "./components/rolesAndPermissions/roles-and-permissions";
import TermsAndConditionForm from "./components/terms-and-condition/terms-and-condition-form";

const SettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState<any>(null);
  const activeSetting = useAppSelector((state) => state.setting.activeSetting);

  const dispatch = useAppDispatch();

  const selectedGlobalData = useAppSelector(
    (state) => state.authentication.selectedData
  );

  useEffect(() => {
    const isNavigatingAway = false;

    const handlePopState = () => {
      if (isNavigatingAway) return;

      if (activeSetting !== ESettings.PROFILE) {
        window.history.pushState(null, "", window.location.href);
        dispatch(setActiveSetting(ESettings.PROFILE));
      }
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [activeSetting, dispatch]);

  useEffect(() => {
    dispatch(setActiveSetting(ESettings.PROFILE));
  }, [dispatch]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getCompanyProfile();

        if (response.status === 200 && response.data) {
          setSelectedData(response.data);
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
          setSelectedData(response.data[0]);
          setLoading(true);
        }
      } catch (error) {
        handleError(error, toast);
      } finally {
        setLoading(false);
      }
    };

    const fetchSeo = async () => {
      try {
        setLoading(true);
        const response = await getSeo();

        if (response.status === 200 && response.data) {
          setSelectedData(response.data.results[0]);
          setLoading(true);
        }
      } catch (error) {
        handleError(error, toast);
      } finally {
        setLoading(false);
      }
    };

    const fetchPrivacyPolicy = async () => {
      try {
        setLoading(true);
        const response = await getPrivacyPolicy();

        if (response.status === 200 && response.data) {
          setSelectedData(response.data);
          setLoading(true);
        }
      } catch (error) {
        console.log(error);
        handleError(error, toast);
      } finally {
        setLoading(false);
      }
    };

    const fetchTermsAndCondition = async () => {
      try {
        setLoading(true);
        const response = await getTermsAndCondition();

        if (response.status === 200 && response.data) {
          setSelectedData(response.data);
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

    if (activeSetting === ESettings.SEO) {
      fetchSeo();
    }

    if (activeSetting === ESettings.PRIVACY_POLICY) {
      fetchPrivacyPolicy();
    }

    if (activeSetting === ESettings.TERMS_AND_CONDITION) {
      fetchTermsAndCondition();
    }
  }, [activeSetting, dispatch]);

  function renderSettingComponent() {
    switch (activeSetting) {

      case ESettings.PROFILE:
        return loading ? (
          <div className="h-[80vh] bg-white flex items-center justify-center">
            <p className="text-lg">Loading Profile...</p>
          </div>
        ) : (
          <Profile initialData={selectedData} />
        );
      case ESettings.CATEGORY:
        return <CategoryTab />;
      case ESettings.EDIT_CATEGORY:
        return <CategoryForm initialData={selectedGlobalData} />;
      case ESettings.ADD_CATEGORY:
        return <CategoryForm initialData={null} />;
      case ESettings.BLOG_CATEGORY:

        return <BlogCategoryTab />;
      case ESettings.ADD_BLOG_CATEGORY:
        return <BlogCategoryForm initialData={null} />;
      case ESettings.EDIT_BLOG_CATEGORY:
        return <BlogCategoryForm initialData={selectedGlobalData} />;
      case ESettings.SUB_CATEGORY:
        return <SubCategoryTab />;
      case ESettings.ADD_SUB_CATEGORY:
        return <SubCategoryForm initialData={null} />;
      case ESettings.EDIT_SUB_CATEGORY:
        return <SubCategoryForm initialData={selectedGlobalData} />;
      case ESettings.BRAND:
        return <BrandTab />;
      case ESettings.ADD_BRAND:
        return <BrandForm initialData={null} />;
      case ESettings.EDIT_BRAND:
        return <BrandForm initialData={selectedGlobalData} />;
      case ESettings.ATTRIBUTES:
        return <AttributeTab />;
      case ESettings.ADD_ATTRIBUTE:
        return <AttributeForm initialData={null} />;
      case ESettings.EDIT_ATTRIBUTE:
        return <AttributeForm initialData={selectedGlobalData} />;
      case ESettings.API_KEYS:
        return <ApiForm initialData={null} />;
      case ESettings.REFERRAL:
        return <ReferralTab />;
      case ESettings.ADD_REFERRAL:
        return <ReferralForm initialData={null} />;
      case ESettings.EDIT_REFERRAL:
        return <ReferralForm initialData={selectedGlobalData} />;
      case ESettings.SECTION_MANAGEMENT:
        return <SectionManagement />;
      case ESettings.SOCIAL_LINKS:
        return <SocialTab />;
      case ESettings.ADD_SOCIAL_LINKS:
        return <SocialForm initialData={null} />;
      case ESettings.EDIT_SOCIAL_LINKS:
        return <SocialForm initialData={selectedGlobalData} />;
      case ESettings.ROLES:
        return <RolesAndPermission />;
      case ESettings.ADD_ROLE:
        return <RolesForm initialData={null} />;
      case ESettings.EDIT_ROLE:
        return <RolesForm initialData={selectedGlobalData} />;
      case ESettings.ORDER_STATUS:
        return <OrderTab />;
      case ESettings.ADD_ORDER_STATUS:
        return <OrderStatusForm initialData={null} />;
      case ESettings.EDIT_ORDER_STATUS:
        return <OrderStatusForm initialData={selectedGlobalData} />;
      case ESettings.PREFERENCES:
        return <PreferenceTab />;
      case ESettings.ADD_PREFERENCES:
        return <PreferenceForm initialData={null} />;
      case ESettings.EDIT_PREFERENCES:
        return <PreferenceForm initialData={selectedGlobalData} />;
      case ESettings.BILLINGS:
        return loading ? (
          <div className="h-[80vh] bg-white flex items-center justify-center">
            <p className="text-lg">Loading Bill Details...</p>
          </div>
        ) : (
          <BillForm initialData={selectedData} />
        );
      case ESettings.SEO:
        return loading ? (
          <div className="h-[80vh] bg-white flex items-center justify-center">
            <p className="text-lg">Loading SEO Details...</p>
          </div>
        ) : (
          <SeoForm initialData={selectedData} />
        );
      case ESettings.INVENTORY_LOCATION:
        return <InventoryTab />;
      case ESettings.ADD_INVENTORY_LOCATION:
        return <InventoryForm initialData={null} />;
      case ESettings.EDIT_INVENTORY_LOCATION:
        return <InventoryForm initialData={selectedGlobalData} />;
      case ESettings.TAXES:
        return <TaxTab />;
      case ESettings.ADD_TAX:
        return <TaxesForm initialData={null} />;
      case ESettings.EDIT_TAX:
        return <TaxesForm initialData={selectedGlobalData} />;
      case ESettings.ADMIN_USERS:
        return <AdminTab />;
      case ESettings.ADD_ADMIN:
        return <AdminForm initialData={null} />;
      case ESettings.EDIT_ADMIN:
        return <AdminForm initialData={selectedGlobalData} />;
      case ESettings.HELP_AND_SUPPORT:
        return <HelpAndSupportTab />;
      case ESettings.ADD_HELP_AND_SUPPORT:
        return <HelpAndSupportForm initialData={null} />;
      case ESettings.EDIT_HELP_AND_SUPPORT:
        return <HelpAndSupportForm initialData={selectedGlobalData} />;
      case ESettings.PRIVACY_POLICY:
        return loading ? (
          <div className="h-[80vh] bg-white flex items-center justify-center">
            <p className="text-lg">Loading Privacy Policy...</p>
          </div>
        ) : (
          <PrivacyPolicyForm initialData={selectedData} />
        );
      case ESettings.TERMS_AND_CONDITION:
        return loading ? (
          <div className="h-[80vh] bg-white flex items-center justify-center">
            <p className="text-lg">Loading Terms and Condition...</p>
          </div>
        ) : (
          <TermsAndConditionForm initialData={selectedData} />
        );
    }
  }

  const normalize = (str: string) => str?.toLowerCase().replaceAll(" ", "-");

  return (
    <div className=" grid grid-col-1 lg:grid-cols-[1fr_3fr] gap-4 max-h-[100vh]">
      <Card className="border-none shadow-none p-0 rounded-sm lg:h-[calc(100vh-100px)] ">
        <CardContent className="p-0 ">
          <h2 className="text-lg font-semibold pl-8 py-4">Settings</h2>
          <nav className="flex lg:flex-col w-[calc(100vw-50px)] lg:w-full gap-2 pl-6 overflow-x-auto md:overflow-y-auto lg:h-[calc(100vh-180px)]">
            {settingData.map((setting: any) => (
              <Button
                key={setting.data}
                variant="ghost"
                onClick={() => {

                  dispatch(setActiveSetting(setting.data));
                  dispatch(setSearchQuery(""));
                }}
                className={cn(
                  "justify-between text-sm font-medium hover:text-primary cursor-pointer",
                  normalize(activeSetting) === (setting.data)
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
      <div className="h-[calc(100vh-100px)] overflow-y-auto ">
        {renderSettingComponent()}
      </div>
    </div>
  );
};

export default withPermissions(SettingsPage, [Permissions.CAN_READ_SETTINGS]);
