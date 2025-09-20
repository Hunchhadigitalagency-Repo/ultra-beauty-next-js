"use client";

import React from 'react';
import useFetchData from '@/hooks/use-fetch';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { RangeFilter } from '@/components/common/filter/range-filter';
import { CheckboxFilter } from '@/components/common/filter/checkbox-filter';
import { toggleCategory, toggleSubcategory, clearSubcategoriesForCategory, toggleBrands } from '@/redux/features/category-slice'
import { PaginatedResponse } from '@/types/common';

interface BrandFilterResult {
    id: number;
    name: string;
}
interface BrandFilterResponse extends PaginatedResponse {
    results: BrandFilterResult[]
}
type Subcategory = {
    id: number;
    name: string;
    product_count?: number;
};

type Category = {
    id: number;
    name: string;
    product_count?: number;
    subcategories: Subcategory[];
};

type CheckboxOption = {
    id: number;
    name: string;
    product_count?: number;
};

const DropDownFilter: React.FunctionComponent = () => {

    const dispatch = useAppDispatch();

    const { selectedCategories, selectedSubcategories, selectedBrands } = useAppSelector(state => state.category);

    const { data: categories } = useFetchData<Category[]>('dropdown/category/');

    const { data: brands } = useFetchData<BrandFilterResponse>('brand-dropdown/?pagination=false');
    console.log(brands)

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

    const getSubcategoryOptions = (): CheckboxOption[] => {
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

                    {selectedCategories.length > 0 && (
                        <CheckboxFilter
                            id="subcategory"
                            title="Sub-Category"
                            options={getSubcategoryOptions()}
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
                        value={[0, 0]}
                        onChange={(value) => console.log(value)}
                        min={0}
                        max={200}
                    />
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default DropDownFilter;