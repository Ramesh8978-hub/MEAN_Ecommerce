import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService,private router : Router) { }

  model ={
    email :'',
    password:''
  };
  emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string |any;
  ngOnInit() {
    if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/products');
  }

  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe(
      ( res: { [x: string]: any; }) => {
        this.userService.setToken(res['token']);
        this.router.navigate(['products']);
      },
      (  err: { error: { message: string; }; }) => {
        this.serverErrorMessages = err.error.message;
      }
    );
    form.reset();
  }

}

