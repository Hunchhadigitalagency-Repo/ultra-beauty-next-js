import { PaginatedResponse } from "./common";

export interface BrandFilterResult {
    id: number;
    name: string;
}
export interface BrandFilterResponse extends PaginatedResponse {
    results: BrandFilterResult[]
}
export type Subcategory = {
    id: number;
    name: string;
    product_count?: number;
};

export type Category = {
    id: number;
    name: string;
    product_count?: number;
    subcategories: Subcategory[];
};

export type CheckboxOption = {
    id: number;
    name: string;
    product_count?: number;
};