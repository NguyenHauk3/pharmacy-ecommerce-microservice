import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-paymenresuls',
  templateUrl: './paymenresuls.component.html',
  styleUrls: ['./paymenresuls.component.scss']
})
export class PaymenresulsComponent {
 paymentSuccess = false;
  orderId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['vnp_TxnRef']; // Mã đơn hàng do VNPay gửi về

      // Gửi params về backend để kiểm tra xác thực và cập nhật trạng thái đơn hàng
      this.orderService.validatePayment(params).subscribe({
        next: (res: any) => {
          this.paymentSuccess = res.success;
          if (this.paymentSuccess) {
            // Xóa giỏ hàng sau khi thanh toán thành công
            localStorage.removeItem('cart');
          }
        },
        error: (err) => {
          this.paymentSuccess = false;
          console.error('Lỗi khi xác thực thanh toán:', err);
        }
      });
    });
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
