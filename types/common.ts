export interface Links {
    next: string;
    previous: string;
}
export interface PaginatedResponse {
    links: Links
    count: number
    page_size: number
    total_pages: number
    current_page: number
}