import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { PaymenService } from 'src/app/services/paymen.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

cartItems: any[] = [];
  totalPrice: number = 0;
  user: any;

  constructor(private orderService: OrderService, private router: Router,
    private paymenService: PaymenService
  ) {}

  ngOnInit(): void {
    // Lấy giỏ hàng từ localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.calculateTotal();
    }

    // Lấy user từ localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateTotal();
  }

  updateQuantity(index: number, quantity: number): void {
    if (quantity < 1) quantity = 1; // đảm bảo số lượng không bé hơn 1
    this.cartItems[index].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateTotal();
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      alert('Giỏ hàng đang trống!');
      return;
    }

  const user = JSON.parse(localStorage.getItem('user')!);
  
  if (!user || !user.id) {
    // Chưa đăng nhập hoặc user không hợp lệ, chuyển về login
    this.router.navigate(['/login']);
    return;
  }

    const order = {
      userId: this.user.id,
      items: this.cartItems.map(item => ({
        productId: item.id,
        quantity: Number(item.quantity),
        price: Number(item.price)
      })),
      totalPrice: Number(this.totalPrice),
      orderDate: new Date(),
      status: 'PENDING'
    };
     localStorage.setItem('orderToSave', JSON.stringify(order));

      const paymentPayload = {
  amount: this.totalPrice?.toString() || '0'
};

  
     // Gọi backend trả về URL thanh toán VNPay
  this.paymenService.createPayment(paymentPayload).subscribe({
    
    next: (paymentUrl: string) => {
      // Chuyển hướng sang trang thanh toán VNPay
      window.location.href = paymentUrl;
    },
    error: (err) => {
      alert('Lỗi khi tạo link thanh toán! Vui lòng thử lại.');
      console.error(err);
    }
  });
  }

    // this.orderService.createOrder(order).subscribe({
    //   next: () => {
    //     alert('Thanh toán thành công!');
    //     this.cartItems = [];
    //     localStorage.removeItem('cart');
    //     this.calculateTotal();
    //     this.router.navigate(['/products']);
    //   },
    //   error: (err) => {
    //     alert('Thanh toán thất bại! Vui lòng thử lại.');
    //     console.error(err);
    //   }
    // });
}
