export interface IFlashSales {
  id: number;
  sales: string;
  discount_percentage: string;
  start_date: string;
  end_date: string;
  products: any[];
  is_active: boolean;
}
