import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
  
    message: string = '';
  isSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    const responseCode = params['vnp_ResponseCode'];

    if (responseCode === '00') {
      const order = localStorage.getItem('orderToSave');
      if (order) {
        const parsedOrder = JSON.parse(order);
        this.orderService.createOrder(parsedOrder).subscribe({
          next: () => {
             this.isSuccess = true;
            this.message = '🎉 Đặt hàng thành công! Đang chuyển hướng...';
            localStorage.removeItem('orderToSave');
            localStorage.removeItem('cart');
            setTimeout(() => {
              this.router.navigate(['/home'], { replaceUrl: true });
            }, 3000);
          },
          error: () => {
            this.isSuccess = false;
            this.message = '❌ Đặt hàng thất bại. Vui lòng thử lại.';
            setTimeout(() => {
              this.router.navigate(['/cart'], { replaceUrl: true });
            }, 3000);
          }
        });
      }
    } else {
      this.isSuccess = false;
      this.message = '❌ Thanh toán thất bại hoặc bị hủy.';
      setTimeout(() => {
        this.router.navigate(['/cart'], { replaceUrl: true });
      }, 3000);
    }
  }
}