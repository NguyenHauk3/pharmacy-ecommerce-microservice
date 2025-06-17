export interface ProductWithDiscountDTO {
  id: number;
  name: string;
  images: string;
  unit: string;
  originalPrice: number;
  discountedPrice: number;
  description: string;
  huongDanSuDung: string;
  thanhPhan: string;
  date: string;
  expiryDate: string;
  categoryId: number;
  categoryName: string;
  promotionId: number;
  promotionName: string;
  manufacturerId: number;
  tenNhaSX: string;
  noiSX: string;
}