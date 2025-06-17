export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface Order {
  userId: number;
  totalPrice: number;
  status: string; // "PENDING", "PAID", "CANCELLED"
  items: OrderItem[];
}