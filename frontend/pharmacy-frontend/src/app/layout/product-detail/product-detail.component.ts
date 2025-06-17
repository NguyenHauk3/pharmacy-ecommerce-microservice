import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { connect } from 'rxjs';
import { Product } from 'src/app/modal/Product';
import { ProductWithDiscountDTO } from 'src/app/modal/ProductWithDiscountDTO';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  
  product: Product | undefined ; 
  discountedPrice = 0;
  originalPrice = 0; 

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductDetail();
  }
  getProductDetail(): void{
  const id = Number(this.route.snapshot.paramMap.get('id'));

      this.productService.getById(id).subscribe((data: any) =>
        {
        this.product = data;
        this.originalPrice = data.price;
        this.discountedPrice = this.originalPrice * (1 - data.percent / 100);;
      },
      (error) => {
        console.error('Error:', error);  // Log lỗi nếu có
      }
      );
  }

  quantity: number = 1;

increaseQuantity(): void {
  if (this.quantity < 100) {
    this.quantity++;
  }
}

decreaseQuantity(): void {
  if (this.quantity > 1) {
    this.quantity--;
  }
}
showNotification: boolean = false;
  addToCart(product: any) {
      const token = localStorage.getItem('token');
  if (!token) {
    this.router.navigate(['/login']);
    return;
  }
   if (!this.product) return;

const productToAdd = {
    ...this.product,
    price: this.discountedPrice 
  };
  this.cartService.addToCart(productToAdd, this.quantity);
  this.showNotification = true;

  setTimeout(() => {
    this.showNotification = false;
  }, 3000);
  }
}
