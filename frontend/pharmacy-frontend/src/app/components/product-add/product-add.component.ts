import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import { ProductService } from 'src/app/services/product.service';
import { PromotionService } from 'src/app/services/promotion.service';

declare var bootstrap: any;
declare var $: any;

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit{
 showNotification: boolean = false;
  name: string = '';
  price?: number;
  description: string = '';
  unit: string = '';
  date: string = '';
expiryDate: string = '';
thanhPhan: string = '';
huongDanSuDung: string = '';
  images: File | null = null;
  selectedCategoryId: number | null = null;
  categories: any[] = [];
  selectedPromotionId: number | null = null;
  promotions: any[] = [];
  selectedManufacturerId: number | null = null;
  manufacturers: any[] = [];

  modalOpen: boolean = false;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private promotionService: PromotionService,
              private manufacturerService: ManufacturerService,
              private rout: Router) { }

  onFileSelected(event: any): void {
    this.images = event.target.files[0];
  }

  ngOnInit(): void {
    this.categoryService.getCategories(0, 100, 'id,asc').subscribe({
      next: (data: any) => {
        this.categories = data.content;
      },
      error: err => {
        console.error('Đã có lỗi khi tải danh mục:', err);
      }
    });
    this.promotionService.getPromotions(0, 100, 'id,asc').subscribe({
      next: (data: any) => {
        this.promotions = data.content;
      },
      error: err => {
        console.error('Đã có lỗi khi tải khuyến mãi:', err);
      }
    });
    this.manufacturerService.getManufacturers(0, 100, 'id,asc').subscribe({
      next: (data: any) => {
        this.manufacturers = data.content;
      },
      error: err => {
        console.error('Đã có lỗi khi tải nhà sản xuất:', err);
      }
    });
  }

  onSubmit() {
    if (!this.name || !this.price ||
       !this.selectedCategoryId || !this.images || !this.selectedPromotionId
      || !this.selectedManufacturerId || !this.date || !this.expiryDate) {
      alert('Vui lòng điền đầy đủ thông tin sản phẩm!');
      return;
    }
    const formData: FormData = new FormData();
    formData.append('name', this.name);
    formData.append('price', this.price?.toString() || '');
    formData.append('description', this.description);
    formData.append('date', this.date);
    formData.append('expiryDate', this.expiryDate);
    formData.append('thanhPhan', this.thanhPhan);
    formData.append('huongDanSuDung', this.huongDanSuDung);
    formData.append('unit', this.unit);
    
     if (this.selectedCategoryId) {
      formData.append('categoryId', this.selectedCategoryId.toString());
    }
    if (this.selectedPromotionId) {
      formData.append('promotionId', this.selectedPromotionId.toString());
    }
    if (this.selectedManufacturerId) {
      formData.append('manufacturerId', this.selectedManufacturerId.toString());
    }
    if (this.images) {
      formData.append('images', this.images, this.images.name);
    }

     this.productService.add(formData).subscribe({
      next: data => {
        this.showNotification = true;
        setTimeout(() => {
        this.showNotification = false;
        this.rout.navigate(['/admin/products']);
        window.location.reload();
      }, 2000);
    }
    });
  }

  closeModal(): void {  
    this.modalOpen = false;
    $('#addProductModal').modal('hide'); // Sử dụng jQuery để đóng modal
  }

  openModal() {
    this.modalOpen = true;
    $('#addProductModal').modal('show'); // Sử dụng jQuery để mở modal
  }
}
