import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentsService } from 'src/app/shared/payments.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  userDetails: any

  constructor(
     private userService: UserService,
     private paymentsService:PaymentsService,
     private router:Router
     ) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      (res: { [x: string]: any; }) => {
        this.userDetails = res['user'];
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  addCard(form:NgForm){
  this.paymentsService.addPayment(form.value).subscribe((data)=>{
    console.log(data);
  })
  this.router.navigate(['userProfile'])
  }

}
