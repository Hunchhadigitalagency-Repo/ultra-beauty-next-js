"use client";

import React from 'react';
import {
    toggleCategory,
    toggleSubcategory,
    clearSubcategoriesForCategory,
    toggleBrands,
    setPriceRange
} from '@/redux/features/category-slice';
import useFetchData from '@/hooks/use-fetch';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { RangeFilter } from '@/components/common/filter/range-filter';
import { CheckboxFilter } from '@/components/common/filter/checkbox-filter';
import { BrandFilterResponse, Category, CheckboxOption } from '@/types/filter';


const DropDownFilter: React.FunctionComponent = () => {

    const dispatch = useAppDispatch();

    const {
        selectedCategories,
        selectedSubcategories,
        selectedBrands,
        priceRange
    } = useAppSelector(state => state.category);

    const { data: categories } = useFetchData<Category[]>('dropdown/category/');

    const { data: brands } = useFetchData<BrandFilterResponse>('brand-dropdown/?pagination=false');

    const categoryOptions: CheckboxOption[] = categories?.map(item => ({
        id: item.id,
        name: item.name,
        product_count: item.product_count
    })) || [];

    const brandOptions: CheckboxOption[] = brands?.results.map(item => ({
        id: item.id,
        name: item.name
    })) || [];

    const handleBrandsChange = (value: number, checked: boolean) => {
        dispatch(toggleBrands({ id: value, checked }));
    }

    const handleCategoryChange = (value: number, checked: boolean) => {
        dispatch(toggleCategory({ id: value, checked }));
        if (!checked) {
            const category = categories?.find(category => category.id === value);
            if (category) {
                const subcategoryIds = category.subcategories.map(sub => sub.id);
                dispatch(clearSubcategoriesForCategory(subcategoryIds));
            }
        }
    };

    const SubcategoryOptions = (): CheckboxOption[] => {
        if (!categories || selectedCategories.length === 0) return [];

        return categories
            .filter(category => selectedCategories.includes(category.id))
            .flatMap(category =>
                category.subcategories.map(sub => ({
                    id: sub.id,
                    name: sub.name,
                    product_count: sub.product_count || 0
                }))
            );
    };

    const handleSubcategoryChange = (value: number, checked: boolean) => {
        dispatch(toggleSubcategory({ id: value, checked }));
    };

    return (
        <div>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                <AccordionItem value="item-1">
                    <CheckboxFilter
                        id="category"
                        title="Category"
                        options={categoryOptions}
                        selectedValues={selectedCategories}
                        onChange={handleCategoryChange}
                    />

                    {selectedCategories.length > 0 &&
                        SubcategoryOptions().length > 0 &&
                        (
                            <CheckboxFilter
                                id="subcategory"
                                title="Sub-Category"
                                options={SubcategoryOptions()}
                                selectedValues={selectedSubcategories}
                                onChange={handleSubcategoryChange}
                            />
                        )}

                    <CheckboxFilter
                        id='brands'
                        title='Brands'
                        options={brandOptions}
                        selectedValues={selectedBrands}
                        onChange={handleBrandsChange}
                    />

                    <RangeFilter
                        title="Price Range"
                        value={priceRange}
                        onChange={(value) => dispatch(setPriceRange(value))}
                        min={100}
                        max={100000}
                    />
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default DropDownFilter;