import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/modal/Category';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-listcate',
  templateUrl: './listcate.component.html',
  styleUrls: ['./listcate.component.scss']
})
export class ListcateComponent implements OnInit {
 page = 0; //Trang hiện tại
  size = 100; // Số lượng bản ghi trên mỗi trang
  sort = 'id,asc';
  categories :Category[]=[];

  allCategoryProducts: any[] = [];
displayedProducts: any[] = [];
selectedCategoryName: string = '';
pageSize: number = 5;
currentIndex: number = 0;
  
    
  
    constructor(private categoryService: CategoryService,
                private productService: ProductService,
                private router: Router,
                private cartService: CartService
    ) { }
   
  
    ngOnInit(): void {
      this.getALL();
     
    }
  
    getALL(): void {
      this.categoryService.getCategories(this.page,this.size,this.sort).subscribe(data => {
        
        this.categories = data.content;
      });
    }

loadProductsByCategory(categoryId: number | undefined) {

   if (categoryId === undefined) {
    console.warn('categoryId is undefined');
    return;
  }
   console.log('Loading products for category ID:', categoryId);
  this.productService.getProductsByCategory(categoryId).subscribe(products => {
    this.allCategoryProducts = products;
    this.selectedCategoryName = this.categories.find(cat => cat.id === categoryId)?.name || '';
    this.currentIndex = 0;
    this.displayedProducts = this.allCategoryProducts.slice(0, this.pageSize);
  });
}

loadMore() {
  this.currentIndex += this.pageSize;
  const more = this.allCategoryProducts.slice(this.currentIndex, this.currentIndex + this.pageSize);
  this.displayedProducts = [...this.displayedProducts, ...more];
}

showNotification: boolean = false;
  quantity: number = 1; // Mặc định số lượng

addToCart(product: any) {
    const token = localStorage.getItem('token');
  if (!token) {
    this.router.navigate(['/login']);
    return;
  }
 const hasPromotion = product.promotion && product.promotion.percent;

  const discountedPrice = hasPromotion
    ? product.price - (product.price * product.promotion.percent) / 100
    : product.price;

  const productToAdd = {
    ...product,
    price: discountedPrice 
  };

  this.cartService.addToCart(productToAdd, this.quantity);
  this.showNotification = true;

  setTimeout(() => {
    this.showNotification = false;
  }, 3000);
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

 viewDetails(productId: number): void {
  this.router.navigate(['/product', productId]);
}
  
}
