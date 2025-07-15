"use client";

import { Accordion } from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { setCriteria } from "@/redux/features/filter-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CheckboxFilter } from "@/components/common/filter/checkbox-filter";
import { RangeFilter } from "@/components/common/filter/range-filter";
import { useEffect, useState } from "react";
import api from "@/services/api-instance";
import { IProductFilter } from "@/types/product";

export const filterConfig = {
  priceRange: {
    min: 10,
    max: 10000,
    step: 10,
    defaultValue: [10, 10000],
  },
};

export default function ProductFilters() {
  const [filterData, setFilterData] = useState<IProductFilter>({
    categories: [],
    subcategories: [],
    inventories: [],
    price_range: {
      min_price: 100,
      max_price: 100000,
    },
    attributes: [],
  });

  useEffect(() => {
    const getFilterData = async () => {
      const response = await api.get("/product-filters-dropdown/");
      if (response.status === 200) {
        setFilterData(response.data);
      }
    };

    getFilterData();
  }, []);

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

  // const handleBrandChange = (brandName: string, checked: boolean) => {
  //   const currentBrands = criteria.brands || [];
  //   const updatedBrands = checked
  //     ? [...currentBrands, brandName]
  //     : currentBrands.filter((brand) => brand !== brandName);

  //   dispatch(
  //     setCriteria({
  //       ...criteria,
  //       brands: updatedBrands,
  //     })
  //   );
  // };

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

  // const handleColorChange = (colorName: string, checked: boolean) => {
  //   const currentColors = criteria.colors || [];
  //   const updatedColors = checked
  //     ? [...currentColors, colorName]
  //     : currentColors.filter((color) => color !== colorName);

  //   dispatch(
  //     setCriteria({
  //       ...criteria,
  //       colors: updatedColors,
  //     })
  //   );
  // };

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
          defaultValue={["category", "subcategory", "price", "attribute"]}
          className="w-full px-4 pb-2"
        >
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
          <RangeFilter
            title="Price"
            value={criteria.priceRange || [10, 10000]}
            min={filterConfig.priceRange.min}
            max={filterConfig.priceRange.max}
            step={filterConfig.priceRange.step}
            formatValue={formatPrice}
            onChange={handlePriceChange}
          />
          <CheckboxFilter
            id="attribute"
            title="Attributes"
            options={filterData.attributes}
            selectedValues={criteria.attributes || []}
            onChange={handleCategoryChange}
          />
        </Accordion>
      </div>
    </div>
  );
}
