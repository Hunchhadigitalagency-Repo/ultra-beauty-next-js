export interface IPaginatedDropdown {
  count: number;
  total_pages: number;
  current_page: number;
  links: { next: null | string; previous: null | string };
  results: IPaginatedDropdownData[]
}

export interface IPaginatedDropdownData {
  id: number;
  image?: string;
  name: string;
}

export interface IDropdownFilterOption {
  id: string
  name: string
}

export interface ICategoryDropdown{
  id: string;
  name: string;
  subcategories: Omit<ICategoryDropdown, "subcategories">[];
}
