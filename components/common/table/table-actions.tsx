"use client";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { EditIcon, EllipsisVertical, TrashIcon } from "lucide-react";

import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { ESettings, ETypes } from "@/types/table";
import { handleDeleteData } from "@/lib/delete-data-utils";
import DeleteModal from "../modals/delete-modal";
import { setActiveSetting } from "@/redux/features/setting-slice";
import EditModal from "../modals/edit-model";

interface TableActionProps<
  T extends { id?: number; slug?: string; slug_name?: string }
> {
  data: T;
  type: string;
  name: string;
  action?: string
}

const TableActions = <
  T extends { id?: number; slug?: string; slug_name?: string }
>({
  data,
  type,
  name,
  action,
}: TableActionProps<T>) => {
  const [isDeleteClick, setIsDeleteClick] = useState(false);
  const dispatch = useAppDispatch();
  const [isEditClick, setIsEditClick] = useState(false);
  const isEdit =
    type === ETypes.INVOICES
    || type === ETypes.CANCEL_REQUEST
    || type === ETypes.RETURN_REQUEST
  const handleDeleteClick = (value: boolean) => {
    setIsDeleteClick(value);
  };

  const handleEditClick = (value: boolean) => {
    setIsEditClick(value);
  };

  const router = useRouter();

  const handleEdit = () => {
    if (type === ETypes.PRODUCTS) {
      router.push("/dashboard/products/edit-products");
    } else if (type === ETypes.BLOGS) {
      router.push("/dashboard/blogs/edit-blogs");
    } else if (type === ETypes.PARTNER_COMPANY) {
      router.push("/dashboard/partner-company/edit-partner-company");
    } else if (type === ETypes.NAVIGATION_INFO) {
      router.push("/dashboard/navigation-info/edit-navigation");
    } else if (type === ETypes.EXPERT_RECOMMENDATION) {
      router.push(
        "/dashboard/expert-recommendation/edit-expert-recommendation"
      );
    } else if (type === ETypes.INVENTORY) {
      router.push(`/dashboard/inventory/edit/${data.id}`);
    } else if (type === ETypes.CATEGORY) {
      dispatch(setActiveSetting(ESettings.EDIT_CATEGORY));
    } else if (type === ETypes.BLOG_CATEGORY) {
      dispatch(setActiveSetting(ESettings.EDIT_BLOG_CATEGORY));
    } else if (type === ETypes.SUBCATEGORY) {
      dispatch(setActiveSetting(ESettings.EDIT_SUB_CATEGORY));
    } else if (type === ETypes.BRAND) {
      dispatch(setActiveSetting(ESettings.EDIT_BRAND));
    } else if (type === ETypes.ATTRIBUTE) {
      dispatch(setActiveSetting(ESettings.EDIT_ATTRIBUTE));
    } else if (type === ETypes.REFERRAL) {
      dispatch(setActiveSetting(ESettings.EDIT_REFERRAL));
    } else if (type === ETypes.SOCIAL_LINKS) {
      dispatch(setActiveSetting(ESettings.EDIT_SOCIAL_LINKS));
    } else if (type === ETypes.TAX) {
      dispatch(setActiveSetting(ESettings.EDIT_TAX));
    } else if (type === ETypes.ORDERS) {
      dispatch(setActiveSetting(ESettings.EDIT_ORDER_STATUS));
    } else if (type === ETypes.ADMIN) {
      dispatch(setActiveSetting(ESettings.EDIT_ADMIN));
    } else if (type === ETypes.INVENTORY_LOCATION) {
      dispatch(setActiveSetting(ESettings.EDIT_INVENTORY_LOCATION));
    } else if (type === ETypes.ORDER_STATUS) {
      dispatch(setActiveSetting(ESettings.EDIT_ORDER_STATUS));
    } else if (type === ETypes.PREFERENCES) {
      dispatch(setActiveSetting(ESettings.EDIT_PREFERENCES));
    } else if (type === ETypes.HELP_AND_SUPPORT) {
      dispatch(setActiveSetting(ESettings.EDIT_HELP_AND_SUPPORT));
    } else if (type === ETypes.ROLES) {
      dispatch(setActiveSetting(ESettings.EDIT_ROLE));
    } else if (type === ETypes.SMS) {
      router.push("/dashboard/sms/edit-sms");
    } else if (type === ETypes.FAQ) {
      router.push("/dashboard/faqs/edit-faqs");
    } else if (type === ETypes.NEWSLETTERS) {
      router.push("/dashboard/newsletters/edit-newsletters");
    } else if (type === ETypes.FLASH_SALES) {
      router.push("/dashboard/flash-sales/edit-flash-sales");
    } else if (type === ETypes.BANNERS) {
      router.push("/dashboard/banners/edit-banner");
    } else if (type === ETypes.COUPON) {
      router.push("/dashboard/cupons/edit-coupon");
    } else if (type === ETypes.TESTIMONIAL) {
      router.push("/dashboard/testimonials/edit-testimonials");
    } else if (type === ETypes.NOTIFICATION) {
      router.push("/dashboard/notification/edit-notification");
    } else if (type === ETypes.CAREER) {
      router.push("/dashboard/career/edit-career");
    } else if (type === ETypes.TEAM) {
      router.push("/dashboard/team/edit-team");
    } else {
      handleEditClick(true);
    }
  };

  // const handleViewClick = (type: string) => {
  //   switch (type) {
  //     case ETypes.PRODUCTS:
  //       router.push(`/dashboard/leads/lead-details/${data.id}`);
  //       break;
  //     default:
  //       setIsViewClick(true);
  //       break;
  //   }
  // };

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <EllipsisVertical className="cursor-pointer" />
        </PopoverTrigger>

        <PopoverContent className="w-40 mr-4 p-2">
          <div className="flex flex-col">
            {/* <button
              className=" hover:bg-gray-100 p-2 cursor-pointer rounded-sm flex items-center gap-2 text-textColor text-sm font-medium"
              onClick={() => handleViewClick(type)}
            >
              <EyeIcon className="size-4" />
              View Details
            </button> */}
            {
              !isEdit &&
              < button
                className="w-full flex items-center gap-2 p-2 hover:bg-secondary cursor-pointer text-textColor text-sm font-medium"
                onClick={handleEdit}
              >
                <EditIcon className="size-4" />
                Edit
              </button>
            }

            <button
              className="w-full flex items-center text-red-400 gap-2 p-2 hover:bg-secondary cursor-pointer text-textColor text-sm font-medium"
              onClick={() => handleDeleteClick(true)}
            >
              <TrashIcon className="size-4" />
              Delete
            </button>
          </div>
        </PopoverContent>
      </Popover >

      {isDeleteClick && (
        <DeleteModal
          itemName={name}
          onDelete={() =>
            handleDeleteData(
              type === ETypes.BLOGS ||
                type === ETypes.TESTIMONIAL ||
                type === ETypes.CAREER
                ? (data.slug as string)
                : type === ETypes.INVENTORY
                  ? (data.id as number)
                  : type === ETypes.PRODUCTS
                    ? (data?.slug_name as string)
                    : type === ETypes.FAQ
                      ? (data?.slug_name as string)
                      : (data.id as number),
              type,
              action || "",
            )

          }
          setIsOptionClick={setIsDeleteClick}
          type={type}
        />
      )
      }

      {
        isEditClick && (
          <EditModal type={type} setIsOptionClick={setIsEditClick} />
        )
      }
    </>
  );
};

export default TableActions;