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

interface BlogsFilterProps {
    selectedValue: string;
    onChange: (value: string) => void;
}

const BlogsFilter: React.FunctionComponent<BlogsFilterProps> = ({ selectedValue, onChange }) => {

    return (
        <Select value={selectedValue} onValueChange={onChange}>
            <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="newest">New to Old</SelectItem>
                    <SelectItem value="oldest">Old to New</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default BlogsFilter;
