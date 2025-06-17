import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  errorMessage: string = '';
  isAuthenicated: boolean = false;
  isAdmin: boolean = false;
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) { }


  ngOnInit(): void {
    this.loadUsers();
    this.isAuthenicated = this.userService.isAuthenticated();
    this.isAdmin = this.userService.isAdmin();
  }

  async loadUsers() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.userService.getAllUsers(token);
      console.log('API response:', response);
      if (response && response.statusCode === 200 && response.userList) {
        this.users = response.userList;
      } else {
        this.showError('No users found.');
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  async export() {
    try {
      const token: any = localStorage.getItem('token');
      const response = await this.userService.getExport(token);
      if (response) {
        // Tạo URL cho file Excel và tự động tải xuống
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `users_export.xlsx`;
        link.click();
      }
    } catch (error: any) {
      this.showError('Xuất file Excel thất bại.');
    }
  }

  async deleteUser(userId: string) {
    const confirmDelete = confirm('Bạn chắc chắn muốn xóa');
    if (confirmDelete) {
      try {
        const token: any = localStorage.getItem('token');
        await this.userService.deleteUser(userId, token);
        // Refresh the user list after deletion
        this.loadUsers();
      } catch (error: any) {
        this.showError(error.message);
      }
    }
  }

  navigateToUpdate(userId: string) {
    this.router.navigate(['/admin/update', userId]);
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }
}
