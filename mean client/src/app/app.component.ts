import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './shared/admin.service';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'meanClient';
  isLoggedIn: false | any

  constructor(
    private router: Router,
    private userService: UserService,
    private adminService:AdminService
  ) { }
  ngOnInit() {
    if (!this.userService.isLoggedIn()&&this.adminService.loggedIn()) {
      this.isLoggedIn = true;
    }
    // if (this.adminService.loggedIn()) {
    //   this.isLoggedIn = true;
    // }
  }
  onLogout(){
    this.adminService.deleteToken();
    this.router.navigate(['/login']);
    this.isLoggedIn = false;

  }

  
}
