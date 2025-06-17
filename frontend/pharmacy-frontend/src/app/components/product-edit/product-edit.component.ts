import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { forkJoin } from 'rxjs';
import { ManufacturerService } from 'src/app/services/manufacturer.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit{
  showNotification: boolean = false;
  id: number = 0;
   page = 0; //Trang hiện tại
  size = 7; // Số lượng bản ghi trên mỗi trang
  sort = 'id,asc';
  imgUrl: string = '';
  selectedFile: File | null = null;
  categories: any[] = [];
  promotions: any[] = [];
  manufacturers: any[] = [];
  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private promotionService: PromotionService,
    private manufacturerService: ManufacturerService,
    private router: ActivatedRoute,
    private rout: Router
  ) { }

  productFormEdit: FormGroup = new FormGroup({
  name: new FormControl(),
  price: new FormControl(),
  unit: new FormControl(),
  date: new FormControl(),
  expiryDate: new FormControl(),
  thanhPhan: new FormControl(),
  huongDanSuDung: new FormControl(),
  description: new FormControl(),
  category: new FormControl(),
  promotion: new FormControl(),
  manufacturer: new FormControl(),
  });

  ngOnInit(): void {
    this.categoryService.getCategories(this.page, 100, this.sort).subscribe((data: any) => {
      this.categories = data.content;
      console.log('acd', this.categories)
    });
    this.promotionService.getPromotions(this.page, 100, this.sort).subscribe((data: any) => {
      this.promotions = data.content;
       console.log('âc',this.promotions)
    });
    this.manufacturerService.getManufacturers(this.page, 100, this.sort).subscribe((data: any) => {
      this.manufacturers = data.content;
    });
    this.id = Number(this.router.snapshot.paramMap.get('id'));
    this.productService.getById(this.id).subscribe((data: any) => {
      
      console.log('1', data.categoryId)
      console.log('2', data.promotionId)
      this.imgUrl = `http://localhost:8088/images/${data.images}`;
      this.productFormEdit.setValue({
        name: data.name,
        price: data.price,
        date: data.date,
        unit: data.unit,
        thanhPhan: data.thanhPhan,
        huongDanSuDung: data.huongDanSuDung,
        expiryDate: data.expiryDate,
        description: data.description,
        category: data.categoryId || null,
        promotion: data.promotionId || null,
        manufacturer: data.manufacturerId || null
      });
    });
    
    
    
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onUpdate() {
    const formData: FormData = new FormData();
    formData.append('name', this.productFormEdit.get('name')?.value || '');
    formData.append('price', this.productFormEdit.get('price')?.value || '');
    formData.append('date', this.productFormEdit.get('date')?.value || '');
    formData.append('expiryDate', this.productFormEdit.get('expiryDate')?.value || '');
    formData.append('unit', this.productFormEdit.get('unit')?.value || '');
    formData.append('thanhPhan', this.productFormEdit.get('thanhPhan')?.value || '');
    formData.append('huongDanSuDung', this.productFormEdit.get('huongDanSuDung')?.value || '');
    formData.append('description', this.productFormEdit.get('description')?.value || '');
    formData.append('categoryId', this.productFormEdit.get('category')?.value || '');
    formData.append('promotionId', this.productFormEdit.get('promotion')?.value || ''); 
    formData.append('manufacturerId', this.productFormEdit.get('manufacturer')?.value || ''); 


    if (this.selectedFile) {
      formData.append('images', this.selectedFile, this.selectedFile.name);
    }

    this.productService.update(this.id, formData).subscribe(data => {
      this.showNotification = true; // Hiển thị thông báo thành công
      
      // Ẩn thông báo sau 2 giây
      setTimeout(() => {
        this.showNotification = false;
        this.rout.navigate(['/admin/products']);
      }, 2000);

    });
  }


  onHome() {
    this.rout.navigate(['/admin/products']);
  }
}
