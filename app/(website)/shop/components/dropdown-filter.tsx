import React from 'react';
import useFetchData from '@/hooks/use-fetch';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { RangeFilter } from '@/components/common/filter/range-filter';
import { CheckboxFilter } from '@/components/common/filter/checkbox-filter';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleCategory, toggleSubcategory, clearSubcategoriesForCategory } from '@/redux/features/category-slice'

type Subcategory = {
    id: number;
    name: string;
    product_count?: number;
};

type Category = {
    id: number;
    name: string;
    subcategories: Subcategory[];
};

type CheckboxOption = {
    id: number;
    name: string;
    product_count: number;
};

const DropDownFilter: React.FunctionComponent = () => {

    const { selectedCategories, selectedSubcategories } = useAppSelector(state => state.category);
    const dispatch = useAppDispatch()

    const { data: categories } = useFetchData<Category[]>('dropdown/category');

    const categoryOptions: CheckboxOption[] = categories?.map(item => ({
        id: item.id,
        name: item.name,
        product_count: item.subcategories.length
    })) || [];


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