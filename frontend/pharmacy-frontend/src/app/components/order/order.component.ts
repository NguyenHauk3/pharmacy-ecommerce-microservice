import { Component } from '@angular/core';
import { Order, OrderItem } from 'src/app/modal/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  userId = 1;
  orderItems: OrderItem[] = [];
  totalPrice = 0;

  productId = 0;
  quantity = 0;
  price = 0;

  constructor(private orderService: OrderService) {}

  addItem() {
    if (this.productId && this.quantity && this.price) {
      this.orderItems.push({
        productId: this.productId,
        quantity: this.quantity,
        price: this.price
      });
      this.calculateTotal();
      this.productId = 0;
      this.quantity = 0;
      this.price = 0;
    }
  }

  calculateTotal() {
    this.totalPrice = this.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  }

  submitOrder() {
    const order: Order = {
      userId: this.userId,
      totalPrice: this.totalPrice,
      status: 'PENDING',
      items: this.orderItems
    };

    this.orderService.createOrder(order).subscribe({
      next: response => {
        alert('Đặt hàng thành công!');
        this.orderItems = [];
        this.totalPrice = 0;
      },
      error: err => {
        console.error(err);
        alert('Lỗi đặt hàng!');
      }
    });
  }
}