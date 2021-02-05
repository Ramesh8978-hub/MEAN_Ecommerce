import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/admin.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loginUserData = {}
  constructor(private adminService: AdminService,private router : Router) { }

  model ={
    email :'',
    password:''
  };
  emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages= false;
  ngOnInit() {
    // if(this.userService.isLoggedIn())
    // this.router.navigateByUrl('/products');
  }

  loginAdmin () {
    this.adminService.loginAdmin(this.model)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this.router.navigate(['/products'])
      },
      err => {
        this.serverErrorMessages = true;
      }
    ) 
  }

}
