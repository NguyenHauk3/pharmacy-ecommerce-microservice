import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/modal/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit{
  page = 0; //Trang hiện tại
  size = 100; // Số lượng bản ghi trên mỗi trang
  sort = 'id,asc';
  categories :Category[]=[];
    
  
    constructor(private categoryService: CategoryService
    ) { }
   
  
    ngOnInit(): void {
      this.getALL();
     
    }
  
    getALL(): void {
      this.categoryService.getCategories(this.page,this.size,this.sort).subscribe(data => {
        
        this.categories = data.content;
        console.log(this.categories); // Lấy danh sách sản phẩm từ API
      });
    }

    onDelete(id: number | undefined){
      if(id != undefined)
      this.categoryService.delete(id).subscribe(data => {
        this.getALL();
      })
    }
  

}
