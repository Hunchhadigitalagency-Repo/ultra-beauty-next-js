"use client";
import SearchBox from "../filter/search-box";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ETypes } from "@/types/table";
import FilterSheet from "../filter/filter-sheet";
import { useAppSelector } from "@/redux/hooks";
import BulkActions from "../table/bulk-actions";
import HeaderBackCard from "../cards/header-back-card";

interface PageHeaderProps {
  type?: string;
  totalItems?: number;
  searchPlaceholder?: string;
  className?: string;
  path?: string;
  buttonText?: string;
  typeClass?: string;
  customButton?: React.ReactNode;
  hasBulkActions?: boolean;
  pageType?: string;
  isSearch?: boolean;
  isCreateOrder?: boolean;
  headerTitle?: string;
  headerPath?: string;
}

const PageHeader = ({
  type = "Items",
  totalItems = 0,
  searchPlaceholder = "Search",
  className,
  path,
  buttonText = "Add New",
  typeClass,
  customButton,
  hasBulkActions = false,
  pageType,
  isSearch,
  isCreateOrder,
  headerPath,
  headerTitle
}: PageHeaderProps) => {
  const { selectedIds } = useAppSelector((state) => state.table);
  // console.log(' this is the sattata', hasBulkActions, selectedIds)
  return (
    <section
      className={`flex justify-between items-center gap-4 flex-wrap ${className}`}
    >
      {
        isCreateOrder ?
          <HeaderBackCard
            title={headerTitle || ""}
            fallBackLink={headerPath || ""}
          />
          :
          < div className="flex items-center gap-4">
            <h4 className={`text-sm text-foreground capitalize ${typeClass}`}>
              {type}
            </h4>
            <div className="bg-pink text-foreground py-1 px-2 text-xs">
              {totalItems}
            </div>
          </div>}

      <div className="flex items-center gap-4 flex-wrap">
        {
          isSearch && <SearchBox placeholder={searchPlaceholder} />
        }


        {(type === ETypes.ORDERS || type === ETypes.INVENTORY || type === ETypes.SALES) && (
          <FilterSheet type={type} />
        )}


        {path && (
          <Link href={path}>
            <Button>{buttonText}</Button>
          </Link>
        )}

        {customButton && customButton}

        {hasBulkActions && selectedIds.length > 0 && pageType && (
          <BulkActions type={pageType} data={[]} />
        )}
      </div>
    </section >
  );
};

export default PageHeader;
