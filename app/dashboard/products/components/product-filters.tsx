"use client";

import { Accordion } from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { setCriteria } from "@/redux/features/filter-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CheckboxFilter } from "@/components/common/filter/checkbox-filter";
import { RangeFilter } from "@/components/common/filter/range-filter";
import { useEffect, useState } from "react";
import { IProductFilter } from "@/types/product";
import api from "@/services/api-instance";

export default function ProductFilters() {
  const [filterData, setFilterData] = useState<IProductFilter>({
    categories: [],
    subcategories: [],
    inventories: [],
    brands: [],
    price_range: {
      min_price: 100,
      max_price: 100000,
    },
  });

  const { selectedString } = useAppSelector(state => state.authentication)
  useEffect(() => {
    const getFilterData = async () => {
      const response = await api.get(`/product-filters-dropdown/?type=${selectedString}`);
      if (response.status === 200) {
        const data = response.data;

        setFilterData({
          categories: [...data.categories],
          subcategories: [...data.subcategories],
          inventories: [...data.inventories, { id: 0, name: "None" },],
          brands: [...data.brands, { id: 0, name: "None" },],
          price_range: data.price_range,
        });
      }
    };

    getFilterData();
  }, [selectedString]);


  const dispatch = useAppDispatch();
  const criteria = useAppSelector((state) => state.filter.criteria);

  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    const currentCategories = criteria.categories || [];
    const updatedCategories = checked
      ? [...currentCategories, categoryId]
      : currentCategories.filter((cat) => cat !== categoryId);

    dispatch(
      setCriteria({
        ...criteria,
        categories: updatedCategories,
      })
    );
  };

  const handleSubCategoryChange = (subcategoryId: number, checked: boolean) => {
    const currentSubcategories = criteria.subcategories || [];
    const updatedSubcategories = checked
      ? [...currentSubcategories, subcategoryId]
      : currentSubcategories.filter((cat) => cat !== subcategoryId);

    dispatch(
      setCriteria({
        ...criteria,
        subcategories: updatedSubcategories,
      })
    );
  };

  const handleInventoryChange = (inventoryId: number, checked: boolean) => {
    const currentInventories = criteria.inventories || [];
    const updatedInventories = checked
      ? [...currentInventories, inventoryId]
      : currentInventories.filter((inv) => inv !== inventoryId);

    dispatch(
      setCriteria({
        ...criteria,
        inventories: updatedInventories,
      })
    );
  };

  const handleBrandChange = (brandId: number, checked: boolean) => {
    const currentBrands = criteria.brands || [];
    const updatedBrands = checked
      ? [...currentBrands, brandId]
      : currentBrands.filter((brand) => brand !== brandId);

    dispatch(
      setCriteria({
        ...criteria,
        brands: updatedBrands,
      })
    );
  };

  const handlePriceChange = (value: number[]) => {
    dispatch(
      setCriteria({
        ...criteria,
        priceRange: [value[0], value[1]] as [number, number],
      })
    );
  };

  const formatPrice = (value: number) => `$${value}`;

  const resetFilters = () => {
    dispatch(setCriteria({}));
  };

  return (
    <div className="rounded-lg bg-white max-lg:overflow-y-auto">
      <div className="flex items-center gap-4 lg:justify-between px-4 py-2">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={resetFilters}
          className="h-8 w-8"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="h-[calc(100vh-20px)] lg:h-[calc(100vh-145px)] overflow-y-auto">
        <Accordion
          type="multiple"
          defaultValue={[
            "category",
            "subcategory",
            "brand",
            "inventory",
            "price",
          ]}
          className="w-full px-4 pb-2 scrollbar-hide"
        >

          <RangeFilter
            title="Price"
            value={
              criteria.priceRange || [
                filterData.price_range.min_price,
                filterData.price_range.max_price,
              ]
            }
            min={filterData.price_range.min_price}
            max={filterData.price_range.max_price}
            step={10}
            formatValue={formatPrice}
            onChange={handlePriceChange}
          />

          <CheckboxFilter
            id="category"
            title="Category"
            options={filterData.categories}
            selectedValues={criteria.categories || []}
            onChange={handleCategoryChange}
          />
          <CheckboxFilter
            id="subcategory"
            title="Subcategory"
            options={
              criteria?.categories !== undefined &&
                criteria?.categories?.length > 0
                ? filterData.subcategories.filter((item) =>
                  criteria.categories?.includes(item.category_id)
                )
                : filterData.subcategories
            }
            selectedValues={criteria.subcategories || []}
            onChange={handleSubCategoryChange}
          />

          <CheckboxFilter
            id="brand"
            title="Brand"
            options={filterData.brands}
            selectedValues={criteria.brands || []}
            onChange={handleBrandChange}
          />
          <CheckboxFilter
            id="inventory"
            title="Inventory"
            options={filterData.inventories}
            selectedValues={criteria.inventories || []}
            onChange={handleInventoryChange}
          />

        </Accordion>
      </div>
    </div>
  );
}
