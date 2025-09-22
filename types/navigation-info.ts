import { IPaginatedDropdownData } from "./dropdown";

export interface INavigationInfo {
  id: number;
  title: string;
  discount_percentage: number;
  expiry_datetime: string;
  products: IPaginatedDropdownData;
  categories: string;
  subcategories: string;
  is_active: boolean;
}
