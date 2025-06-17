import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  constructor(private readonly userService: UserService,
                private readonly router: Router
  
     ){}
  
    isAuthenticated:boolean = false;
    isAdmin:boolean = false;
    isUser:boolean = false;
  
  
    ngOnInit(): void {
        this.isAuthenticated = this.userService.isAuthenticated();
        this.isAdmin = this.userService.isAdmin();
        this.isUser = this.userService.isUser();
    }
  
    logout():void{
      this.userService.logOut();
      this.isAuthenticated = false;
      this.isAdmin = false;
      this.isUser = false;
      this.router.navigate(['/login']);
    }
}
