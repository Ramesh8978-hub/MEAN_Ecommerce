import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/admin.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  isLoggedIn:false|any
  constructor(private router: Router,private adminService: AdminService) { }

  ngOnInit(): void {
    if (this.adminService.loggedIn()) {
      this.isLoggedIn = true;
    }
  }
  onLogout(){
    this.adminService.deleteToken();
    this.router.navigate(['/login']);
  }
}
