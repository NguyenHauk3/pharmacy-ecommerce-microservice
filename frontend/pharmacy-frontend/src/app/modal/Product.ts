
export class Category {
  id?: number;
  name?: string;
  description?: string;
}
export class Product{
    id?: number;
    name?: string;
    price?: number;
    description?: string;
    unit?: number;
    images?: string;
    date?: string;
    expiryDate?: string;
    thanhPhan?: string;
    huongDanSuDung?: string;
    categoryId?: String;
    promotionId?: String;
    manufacturerId?: String;
    tenNhaSX?: String;
    noiSX?: String;
    percent?: number;
    categoryName?: String;
    promotionName?: String;
    category?: Category;

}