import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modal/Product';

import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  expiringProducts: Product[] = [];
  products:Product[]=[];
  page = 0; //Trang hiện tại
  size = 7; // Số lượng bản ghi trên mỗi trang
  sort = 'id,asc';
  totalElements = 0; //Tổng số bản ghi
  totalPage = 0; //Tổng số trang
  Math = Math;
  searchParams: any = {
    name: '',
    minPrice: '',
    maxPrice: '',
    description: ''
  };
  constructor(private productService: ProductService,
              private userService: UserService
  ) { }

  isAuthenticated:boolean = false;
  isAdmin:boolean = false;  
  isUser:boolean = false;

  ngOnInit(): void {
    this.getALL();
    this.isAdmin = this.userService.isAdmin();
    this.isAuthenticated = this.userService.isAuthenticated();
  }

  filterExpiringProducts(): void {
  const now = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(now.getMonth() + 1);

  this.expiringProducts = this.products.filter(product => {
    if (product.expiryDate) {
      const expiry = new Date(product.expiryDate);
      return expiry >= now && expiry <= nextMonth;
    }
    return false;
  });
}

  

  getALL(): void {
    this.productService.searchProducts(this.searchParams, this.page, this.size, this.sort).subscribe(data => {
      console.log(data);
      this.products = data.content; // Lấy danh sách sản phẩm từ API
      this.totalElements = data.totalElements; // Tổng số bản ghi từ API
      this.totalPage = data.totalPages; // Tổng số trang từ API
      
    });
  }

  nextPage(event: MouseEvent): void {
    event.preventDefault();
    if (this.page < Math.ceil(this.totalElements / this.size) - 1) {
      this.page++;
      this.getALL();
    }
  }

  prevPage(event: MouseEvent): void {
    event.preventDefault();
    if (this.page > 0) {
      this.page--;
      this.getALL();
    }
  }
  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPage }, (_, index) => index);
  }
  goToPage(pageNumber: number, event: MouseEvent): void {
    event.preventDefault();
    this.page = pageNumber; // Đặt số trang hiện tại là số trang được chọn
    this.getALL(); // Gọi lại hàm load sản phẩm khi chuyển trang
  }

  onDelete(id: number | undefined){
    if(id != undefined)
    this.productService.delete(id).subscribe(data => {
      this.getALL();
    })
  }

  onSearchChange(): void {
    this.page = 0; // Reset to first page
    this.getALL();
  }
}
