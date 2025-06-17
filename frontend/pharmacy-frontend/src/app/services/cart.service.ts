import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class CartService {
 
    private cart = JSON.parse(localStorage.getItem('cart') || '[]');
  private itemCount = new BehaviorSubject<number>(this.getCartCount());

  itemCount$ = this.itemCount.asObservable();

  getCart(): any[] {
    return this.cart;
  }

  getCartCount(): number {
    return this.cart.reduce((total: number, item : any) => total + item.quantity, 0);
  }

  // addToCart(product: any, quantity: number = 1): void {
  //   const index = this.cart.findIndex((item: any) => item.id === product.id);
  //   if (index !== -1) {
  //     this.cart[index].quantity += quantity;
  //   } else {
  //     this.cart.push({ ...product, quantity, price: product.discountedPrice });
  //   }
  //   this.saveCart();
  // }
  addToCart(product: any, quantity: number = 1): void {
  const index = this.cart.findIndex((item: any) => item.id === product.id);
  if (index !== -1) {
    // Nếu sản phẩm đã có trong giỏ thì tăng số lượng
    this.cart[index].quantity += quantity;
    // Nếu bạn muốn cập nhật giá (ví dụ giá mới hoặc discountedPrice mới), uncomment dòng dưới:
    // this.cart[index].price = product.discountedPrice ?? this.cart[index].price;
  } else {
    // Thêm sản phẩm mới, chắc chắn lấy đúng giá từ discountedPrice hoặc fallback sang product.price
    const price = product.discountedPrice ?? product.price ?? 0;
    this.cart.push({ ...product, quantity, price });
  }
  this.saveCart();
}

  updateCart(cart: any[]): void {
    this.cart = cart;
    this.saveCart();
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.itemCount.next(this.getCartCount());
  }
}
