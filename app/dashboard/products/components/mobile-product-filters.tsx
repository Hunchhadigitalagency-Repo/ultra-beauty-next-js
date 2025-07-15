import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ProductFilters from "./product-filters";
import { Filter } from "lucide-react";

const MobileProductFilters = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden flex items-center gap-2 bg-transparent h-10"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 sm:w-96 bg-white ">
        <ProductFilters />
      </SheetContent>
    </Sheet>
  );
};

export default MobileProductFilters;
