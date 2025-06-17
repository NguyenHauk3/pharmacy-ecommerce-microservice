import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent {
addSuccess: boolean = false;
errorMessage: string = '';

  categoryForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('')
  });

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.categoryForm.get('name')?.value);
    formData.append('description', this.categoryForm.get('description')?.value);
    console.log(this.categoryForm.value)

     const addcate = this.categoryForm.value;
    this.categoryService.add(addcate).subscribe({
      next: (response) => {
        this.addSuccess = true;
        this.errorMessage = '';

        // Chuyển hướng sau 2 giây
        setTimeout(() => {
          this.router.navigate(['/admin/category']);
        }, 2000);
      },
      error: (err) => {
  if (err.error && typeof err.error === 'string') {
    this.errorMessage = err.error;
  } else {
    this.errorMessage = 'Đã xảy ra lỗi khi thêm danh mục.';
  }
}
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/category']);
  }
}
