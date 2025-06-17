import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit{
updateForm!: FormGroup;
  userId!: string;
  token!: string;
  errorMessage = '';
  isRoleEditable: boolean = false;
  showNotification: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
    this.userId = this.route.snapshot.paramMap.get('id')!;

    // Không cần Validators vì không bắt buộc nhập đầy đủ
    this.updateForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      gender: [''],
      role: [''],
      password: ['']
    });

    this.loadUserData();
  }

  async loadUserData() {
    try {
      const response = await this.userService.getYourProfile(this.token);
      const user = response?.data?.user || response.user;

      this.updateForm.patchValue({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        gender: user.gender || '',
        role: user.role || ''
      });

      // Ẩn chỉnh sửa role nếu không phải admin
      this.isRoleEditable = user.role === 'ADMIN';
      if (!this.isRoleEditable) {
        this.updateForm.get('role')?.disable();
      }

    } catch (error) {
      this.errorMessage = 'Không thể tải dữ liệu người dùng';
    }
  }

  async onSubmit() {
    try {
      const formData = this.updateForm.getRawValue(); // lấy cả role (kể cả disabled)

      // Nếu không nhập mật khẩu mới → xoá trường password khỏi data
      if (!formData.password || formData.password.trim() === '') {
        delete formData.password;
      }

      const response = await this.userService.updateUSer(this.userId, formData, this.token);
      this.showNotification = true;
       setTimeout(() => {
    this.showNotification = false;
    this.router.navigate(['/profile/user']);
  }, 1500);
    } catch (error: any) {
      console.error(error);
      this.errorMessage = 'Đã xảy ra lỗi khi cập nhật.';
    }
  }
}
