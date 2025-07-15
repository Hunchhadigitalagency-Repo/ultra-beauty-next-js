import React from "react";
import SearchBox from "../filter/search-box";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ETypes } from "@/types/table";
import AddModal from "../modals/add-modal";
import FilterSheet from "../filter/filter-sheet";

interface PageHeaderProps {
  type?: string;
  totalItems?: number;
  searchPlaceholder?: string;
  className?: string;
  path?: string;
  buttonText?: string;
}

const PageHeader = ({
  type = "Items",
  totalItems = 0,
  searchPlaceholder = "Search",
  className = "",
  path,
  buttonText = "Add New",
}: PageHeaderProps) => {
  return (
    <section className={`flex justify-between items-center gap-4 flex-wrap ${className}`}>
      <div className="flex items-center gap-4">
        <h4 className="text-sm text-foreground capitalize">All {type}</h4>
        <div className="bg-gray text-foreground py-1 px-2 text-xs">
          {totalItems}
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <SearchBox placeholder={searchPlaceholder} />

        {type === ETypes.ORDERS && <FilterSheet type={type} />}

        {path && (
          <Link href={path}>
            <Button>{buttonText}</Button>
          </Link>
        )}

        {type === ETypes.TRANSACTIONS && (
          <AddModal type={ETypes.TRANSACTIONS} text="Add Transaction" />
        )}
      </div>
    </section>
  );
};

export default PageHeader;
