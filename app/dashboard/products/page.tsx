"use client";

import type React from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import SearchBox from "@/components/common/filter/search-box";
import ProductFilters from "./components/product-filters";
import ProductTabs from "./components/product-tabs";
import { useRouter } from "next/navigation";
import BulkActions from "@/components/common/table/bulk-actions";
import MobileProductFilters from "./components/mobile-product-filters";
import { ETypes } from "@/types/table";
import { withPermissions } from "@/hoc/withPermissions";
import { Permissions } from "@/types/permissions";

const ProductsPage = () => {
  const selectedIds = useAppSelector((state) => state.table.selectedIds);
  const router = useRouter();

  return (
    <main className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full lg:h-[calc(100vh-100px)] lg:overflow-hidden">
      <section className="hidden lg:block col-span-1">
        <ProductFilters />
      </section>

      <section className="col-span-3 bg-white p-4 space-y-4 rounded-lg">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <SearchBox />
          <div className="lg:hidden">
            <MobileProductFilters />
          </div>
          <div className="flex items-center gap-3">
            {selectedIds.length > 0 && <BulkActions type={ETypes.PRODUCTS} data={[]} />}

            <Button
              className="text-white flex items-center gap-2"
              onClick={() => router.push("/dashboard/products/add-products")}
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>
        <ProductTabs />
      </section>
    </main>
  );
};

export default withPermissions(ProductsPage, [Permissions.CAN_READ_PRODUCTS]);
