import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/modal/Product';
import { ProductWithDiscountDTO } from 'src/app/modal/ProductWithDiscountDTO';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-listpromo',
  templateUrl: './listpromo.component.html',
  styleUrls: ['./listpromo.component.scss']
})
export class ListpromoComponent implements OnInit{
    products: Product[] = [] ;
   

  constructor(
                  private productService: ProductService,
                  private router: Router,
                  private cartService: CartService
      ) { }
     
    
      ngOnInit(): void {
       this.productService.getProductsByPromotion().subscribe(data => {
      this.products = data;
    
    });
       
      }
    
      
  showNotification: boolean = false;
  addToCart(product: any): void {
      const token = localStorage.getItem('token');
  if (!token) {
    this.router.navigate(['/login']);
    return;
  }
     const discountedPrice = product.price * (1 - (product.percent ?? 0) / 100);

    const cartProduct = {
    ...product,
    price: discountedPrice 
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
 @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
 
 scrollLeft() {
   this.scrollContainer.nativeElement.scrollBy({
     left: -200,
     behavior: 'smooth'
   });
 }
 
 scrollRight() {
   this.scrollContainer.nativeElement.scrollBy({
     left: 200,
     behavior: 'smooth'
   });
 }
}
