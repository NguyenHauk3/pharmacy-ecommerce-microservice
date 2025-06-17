import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-promotion-add',
  templateUrl: './promotion-add.component.html',
  styleUrls: ['./promotion-add.component.scss']
})
export class PromotionAddComponent {
addSuccess: boolean = false;
errorMessage: string = '';

  promotionForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl(''),
    percent: new FormControl('')
  });

  constructor(
    private promotionService: PromotionService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.promotionForm.invalid) {
      this.promotionForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.promotionForm.get('name')?.value);
    formData.append('date', this.promotionForm.get('date')?.value);
    formData.append('percent', this.promotionForm.get('percent')?.value);
   

     const addpro = this.promotionForm.value;
    this.promotionService.add(addpro).subscribe({
      next: (response) => {
        this.addSuccess = true;

        // Chuyển hướng sau 2 giây
        setTimeout(() => {
          this.router.navigate(['/promotions']);
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
    this.router.navigate(['/promotions']);
  }
}
