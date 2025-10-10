import InventoryFilter from "@/app/dashboard/inventory/components/inventory-filter";
import OrderFilterForm from "@/app/dashboard/orders/components/order-filter-form";
import SaleFilter from "@/app/dashboard/sales/components/sale-filter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ETypes } from "@/types/table";
import { FilterIcon } from "lucide-react";
import React from "react";

interface IFilterSheetProps {
  type: string;
}

const FilterSheet = ({ type }: IFilterSheetProps) => {
  const renderContent = () => {
    if (type === ETypes.ORDERS) {
      return <OrderFilterForm />;
    }
    if (type === ETypes.SALES) {
      return <SaleFilter />;
    }
    if (type === ETypes.INVENTORY) {
      return <InventoryFilter />;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <FilterIcon /> Filter
        </Button>
      </SheetTrigger>
      <SheetContent className="p-4">
        <SheetTitle>Custom Filter</SheetTitle>
        {renderContent()}
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
