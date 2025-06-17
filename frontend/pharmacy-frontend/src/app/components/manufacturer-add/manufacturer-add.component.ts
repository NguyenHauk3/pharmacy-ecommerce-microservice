import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManufacturerService } from 'src/app/services/manufacturer.service';

@Component({
  selector: 'app-manufacturer-add',
  templateUrl: './manufacturer-add.component.html',
  styleUrls: ['./manufacturer-add.component.scss']
})
export class ManufacturerAddComponent {
addSuccess: boolean = false;
errorMessage: string = '';

  manufacturerForm: FormGroup = new FormGroup({
    tenNhaSX: new FormControl('', Validators.required),
    noiSX: new FormControl('')
  });

  constructor(
    private manufacturerService: ManufacturerService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.manufacturerForm.invalid) {
      this.manufacturerForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('tenNhaSX', this.manufacturerForm.get('tenNhaSX')?.value);
    formData.append('noiSX', this.manufacturerForm.get('noiSX')?.value);
    console.log(this.manufacturerForm.value)

     const addmanu = this.manufacturerForm.value;
    this.manufacturerService.add(addmanu).subscribe({
      next: (response) => {
        this.addSuccess = true;

        // Chuyển hướng sau 2 giây
        setTimeout(() => {
          this.router.navigate(['/admin/manufacturer']);
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
    this.router.navigate(['/admin/manufacturer']);
  }
}
