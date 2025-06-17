import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

   profileInfo: any = null;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ){}

  async ngOnInit() {
    this.loading = true;
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn.");
    }

    const response = await this.userService.getYourProfile(token);
    console.log('Profile API response:', response);

    // Giả sử cấu trúc có trường data.user
    this.profileInfo = response.data?.user ?? response;

    if (!this.profileInfo) {
      throw new Error("Không thể tải thông tin người dùng.");
    }
  } catch (error: any) {
    this.showError(error.message || "Lỗi khi tải thông tin profile");
  } finally {
    this.loading = false;
  }
  }

  updateProfile(id: string) {
    this.router.navigate(['/admin/update', id]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
