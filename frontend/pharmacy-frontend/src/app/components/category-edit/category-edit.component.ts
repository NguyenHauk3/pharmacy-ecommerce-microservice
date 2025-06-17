import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit{
  updateSuccess: boolean = false;
    id: number = 0;
    constructor(private categoryService: CategoryService,
      private router: ActivatedRoute,
      private rout: Router
    ) { }
  
    categoryFormEdit: FormGroup = new FormGroup({
    name: new FormControl(),
    description: new FormControl()
    });
  
    ngOnInit(): void {
      this.id = Number(this.router.snapshot.paramMap.get('id'));
      this.categoryService.getById(this.id).subscribe((data: any) => {
        
        this.categoryFormEdit.setValue({
          name: data.name,
          description: data.description
        });
      });
      
    
    }
  
   
    
  
    onUpdate() {
      const formData: FormData = new FormData();
      formData.append('name', this.categoryFormEdit.get('name')?.value || '');
     
      formData.append('description', this.categoryFormEdit.get('description')?.value || '');
    
      const updatecate = this.categoryFormEdit.value;
  
      this.categoryService.update(this.id, updatecate).subscribe(data => {
        this.updateSuccess = true; // Hiển thị thông báo thành công
  
        // Ẩn thông báo sau 2 giây
        setTimeout(() => {
          this.updateSuccess = false;
          this.rout.navigate(['/admin/category']);
        }, 2000);
  
      });
    }
  
  
    onHome() {
      this.rout.navigate(['/admin/category']);
    }
}
