import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/modal/Product';
import { ProductWithDiscountDTO } from 'src/app/modal/ProductWithDiscountDTO';
import { CartService } from 'src/app/services/cart.service';
import { ProductService} from 'src/app/services/product.service';

@Component({
  selector: 'app-listpro',
  templateUrl: './listpro.component.html',
  styleUrls: ['./listpro.component.scss']
})
export class ListproComponent {
  products: ProductWithDiscountDTO[] = []; // danh sách đầy đủ từ API
  displayedProducts: ProductWithDiscountDTO[] = [];

  // Khởi đầu hiện 8 sản phẩm
  initialDisplayCount = 8;
  loadMoreCount = 4;

  constructor(private productService: ProductService,
    private router: Router,
    private cartService: CartService
                
    ) { }

  ngOnInit(): void {
    this.productService.getProductsWithDiscount(0,100).subscribe(response => {
      // Nếu API trả về có content bên trong Page
      this.products = response.content || response;
      this.displayedProducts = this.products.slice(0, this.initialDisplayCount);
    });
  }

  loadMore(): void {
    const currentLength = this.displayedProducts.length;
    const nextLength = currentLength + this.loadMoreCount;
    this.displayedProducts = this.products.slice(0, nextLength);
  }

  showNotification: boolean = false;
  addToCart(product: any): void {
     const token = localStorage.getItem('token');
  if (!token) {
    this.router.navigate(['/login']);
    return;
  }

    const cartProduct = {
    ...product,
    price: product.discountedPrice 
  };
     this.cartService.addToCart(cartProduct);
  this.showNotification = true;
  
  setTimeout(() => {
    this.showNotification = false;
  }, 3000); // Ẩn sau 3 giây
  }

  viewDetails(productId: number): void {
  this.router.navigate(['/product', productId]);
}
}
