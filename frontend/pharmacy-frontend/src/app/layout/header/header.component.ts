import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/modal/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

   isAuthenticated:boolean = false;
    isAdmin:boolean = false;
    isUser:boolean = false;
  cartItemCount = 0;
   
products:Product[]=[];
  page = 0; //Trang hiện tại
  size = 100; // Số lượng bản ghi trên mỗi trang
  sort = 'id,asc';
  Math = Math;
  searchParams: any = {
    name: '',
    minPrice: '',
    maxPrice: '',
    description: ''
  };

 constructor(private readonly userService: UserService,
                private readonly router: Router,
                private cartService: CartService,
                private productService: ProductService,
                private eRef: ElementRef
  
     ){}
  
   
  
  
    ngOnInit(): void {
        this.isAuthenticated = this.userService.isAuthenticated();
        this.isAdmin = this.userService.isAdmin();
        this.isUser = this.userService.isUser();
this.cartService.itemCount$.subscribe(count => {
    this.cartItemCount = count;
    this.getALL();
  });
        
    }
  
    logout():void{
      this.userService.logOut();
      this.isAuthenticated = false;
      this.isAdmin = false;
      this.isUser = false;
      localStorage.removeItem('user');
  localStorage.removeItem('cart'); 
      this.router.navigate(['/home']);
    }
    goToCart() {
  const token = localStorage.getItem('token');
  if (!token) {
    this.router.navigate(['/login']);
  } else {
    this.router.navigate(['/cart']);
  }
}
isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}

 getALL(): void {
    this.productService.searchProducts(this.searchParams, this.page, this.size, this.sort).subscribe(data => {
      this.products = data.content; // Lấy danh sách sản phẩm từ API
    });
    console.log(this.products)

  }
  onSearchChange(): void {
    this.page = 0; // Reset to first page
    this.getALL();
  }



goToProduct(productId?: number): void {
  this.router.navigate(['/product', productId]);
}
clearSearch(): void {
  this.searchParams.name = '';
}
}
