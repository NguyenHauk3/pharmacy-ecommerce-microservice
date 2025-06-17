import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent { 
  constructor(
    private readonly userService: UserService,
    private router: Router
  ) { }


  email: string = ''
  password: string = ''
  errorMessage: string = ''

  async handleSubmit() {

    if (!this.email || !this.password) {
      this.showError("Nhập đầy đủ thông tin");
      return
    }

    try {
      const response = await this.userService.login(this.email, this.password);
      if(response.statusCode == 200){
        localStorage.setItem('token', response.token)
        localStorage.setItem('role', response.role)

        const userProfile = await this.userService.getYourProfile(response.token);
      localStorage.setItem('user', JSON.stringify(userProfile.user));
        //Điều hướng
      let targetRoute = '/';
      if (response.role === 'ADMIN') {
        targetRoute = '/admin/orderReport';
      } else if (response.role === 'USER') {
        targetRoute = '/user/home';
      }

        this.router.navigate([targetRoute]).then(() => {
          window.location.reload();
        });
      }else{
        this.showError("Tài khoản không tồn tại")
      }
    } catch (error: any) {
      this.showError(error.message)
    }

  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }
}
