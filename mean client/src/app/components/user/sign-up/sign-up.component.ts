import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

  user: User | any
  showSuccessMessage:boolean| any
  serverErrorMessage:string |any

  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  onSubmit(form:NgForm) {
    this.userService.createUser(form.value).subscribe((data) => {
      console.log(data);
      this.showSuccessMessage=true;
      setTimeout(()=>this.showSuccessMessage=false,4000)
    },
    err=>{
      if(err.status===422){
        this.serverErrorMessage=err.error.join(',')
      }
      else{
        this.serverErrorMessage='Something went wrong please contact Admin'
      }
    })
    form.reset();
  }

}
