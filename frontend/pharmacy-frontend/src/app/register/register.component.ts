import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formData: any = {
    name: '',
    email: '',
    password: '',
    role: '',
    address: '',
    phone: '',
    gender: ''
  };
  errorMessage: string = '';

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) { }
showNotification: boolean = false;
  async handleSubmit() {

    // Check if all fields are not empty
    if (!this.formData.name || !this.formData.email || !this.formData.password || !this.formData.phone || !this.formData.address || !this.formData.gender) {
      this.showError('Nhập đầy đủ các trường');
      return;
    }

    try {

      const response = await this.userService.register(this.formData);
      if (response.statusCode === 200) {
        this.showNotification = true;
  
  setTimeout(() => {
    this.showNotification = false;
    this.router.navigate(['/login']);
  }, 2000); // Ẩn sau  giây
        
      } else {
        this.showError(response.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the specified duration
    }, 3000);
  }
}
