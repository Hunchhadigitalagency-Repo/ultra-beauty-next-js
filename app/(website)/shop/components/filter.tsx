import { CheckboxFilter } from '@/components/common/filter/checkbox-filter'
import { RangeFilter } from '@/components/common/filter/range-filter'
import { Accordion, AccordionItem } from '@/components/ui/accordion'
import { RefreshCcw } from 'lucide-react'
import React from 'react'

const FilterSection = () => {
    return (
        <aside className="w-72 min-h-96 h-full bg-[#FAFAFA] p-4 rounded-md hidden lg:block">
            <div className="flex items-center justify-between mb-4">
                <h1 className="font-semibold text-lg">Filters</h1>
                <RefreshCcw className="w-5 h-5 cursor-pointer" />
            </div>
            <div>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                    <AccordionItem value="item-1">
                        <CheckboxFilter
                            id='Category'
                            title='Category'
                            options={[
                                { id: 1, name: 'Skincare', product_count: 120 },
                                { id: 2, name: 'Makeup', product_count: 80 },
                                { id: 3, name: 'Haircare', product_count: 60 },
                            ]}
                            selectedValues={[1, 2]}
                            onChange={(value, checked) => console.log(value, checked)}
                        />
                        <CheckboxFilter
                            id='Brand'
                            title='Brand'
                            options={[
                                { id: 1, name: 'Brand A', product_count: 120 },
                                { id: 2, name: 'Brand B', product_count: 80 },
                                { id: 3, name: 'Brand C', product_count: 60 },
                            ]}
                            selectedValues={[]}
                            onChange={(value, checked) => console.log(value, checked)}
                        />
                        <RangeFilter
                            title='Price Range'
                            value={[0, 0]}
                            onChange={(value) => console.log(value)}
                            min={0}
                            max={200}
                        />
                    </AccordionItem>
                </Accordion>
            </div>
        </aside>
    )
}

export default FilterSection