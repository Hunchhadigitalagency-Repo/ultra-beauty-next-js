export interface WishListResponse {
    links: Links
    count: number
    page_size: number
    total_pages: number
    current_page: number
    results: Result[]
}

export interface Links {
    next: any
    previous: any
}

export interface Result {
    id: number
    user: number
    products: Product[]
    created_at: string
}

export interface Product {
    image: string
    name: string
    sku: string
    quantity: number
    general_description: string
    detail_description: string
    price: string
    discount_percentage?: string
    average_rating: number;
    flash_end_date: string
    flash_sale_discount?: string
    is_flash_sale: boolean
    slug_name: string
    is_published: boolean
    is_Featured: boolean
    is_new: boolean
    is_best_seller: boolean
    is_tax_applicable: boolean
    tutorial: any
    youtube_link: string
    created_at: string
    updated_at: string
    brand: number
    tax_applied: any
    package: any[]

}