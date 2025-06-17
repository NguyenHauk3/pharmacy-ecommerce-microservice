import { Component, OnInit } from '@angular/core';
import { OrderDTO, OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit{
 orders: OrderDTO[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(data => {
      this.orders = data;
    });
  }

  deleteOrder(id: number) {
    if (confirm('Bạn có chắc muốn xóa đơn hàng này?')) {
      this.orderService.deleteOrder(id).subscribe(() => {
        this.orders = this.orders.filter(o => o.id !== id);
      });
    }
  }

  updateStatus(id: number, status: string) {
    this.orderService.updateStatus(id, status).subscribe(() => {
      const order = this.orders.find(o => o.id === id);
      if (order) order.status = status;
    });
  }
}
