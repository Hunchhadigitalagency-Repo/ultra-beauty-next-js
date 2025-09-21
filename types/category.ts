export interface Subcategory {
    id: number;
    name: string;
    product_count?: number;
};

export interface Category {
    id: number;
    name: string;
    subcategories: Subcategory[];
};