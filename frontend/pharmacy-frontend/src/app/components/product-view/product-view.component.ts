import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/modal/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProductDetail();
    
  }

  getProductDetail(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Product ID:', id);  // In ra để kiểm tra id có đúng không
  
    if (isNaN(id)) {
      console.error('Invalid product ID');
      return;
    }
  
    this.productService.getById(id).subscribe(
      (data: any) => {
        console.log('API Response:', data);  // In ra response để kiểm tra cấu trúc
        this.product = data;  // Gán dữ liệu vào product
        console.log('Product:', this.product);  // Kiểm tra product có được gán đúng không
      },
      (error) => {
        console.error('Error:', error);  // Log lỗi nếu có
      }
    );
}
}
