"use client";

import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface ProductSortProps {
    selectedValue: string;
    onChange: (value: string) => void;
}

const ProductSort: React.FunctionComponent<ProductSortProps> = ({ selectedValue, onChange }) => {

    return (
        <Select value={selectedValue} onValueChange={onChange}>
            <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="name_a_to_z">A to Z</SelectItem>
                    <SelectItem value="name_z_to_a">Z to A</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default ProductSort;
