import React from 'react';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { RangeFilter } from '@/components/common/filter/range-filter';
import { CheckboxFilter } from '@/components/common/filter/checkbox-filter';

const DropDownFilter: React.FunctionComponent = () => {
    return (
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
    )
}

export default DropDownFilter