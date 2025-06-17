import { Component, OnInit } from '@angular/core';
import { OrderDTO, OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-listorder',
  templateUrl: './listorder.component.html',
  styleUrls: ['./listorder.component.scss']
})
export class ListorderComponent implements OnInit {

  orders: OrderDTO[] = [];
  user: any;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.loadOrders();
    } else {
      // xử lý chưa đăng nhập
      alert('Bạn cần đăng nhập để xem đơn hàng');
    }
  }

  loadOrders() {
  this.orderService.getOrdersByUserId(this.user.id).subscribe({
    next: (data) => {
      this.orders = data;
      console.log('Dữ liệu đơn hàng:', data);
    },
    error: (err) => console.error('Lỗi tải đơn hàng:', err)
  });
}
}
