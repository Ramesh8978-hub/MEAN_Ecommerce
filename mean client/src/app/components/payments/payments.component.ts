import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/payment';
import { PaymentsService } from 'src/app/shared/payments.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  paymentList: Payment[] | any;
  payment: Payment | any;
  userDetails: any;
  editMode = true

  constructor(
    private router: Router,
    private paymentsService: PaymentsService,
    private userService: UserService,
  ) { }
  ngOnInit(): void {
    this.paymentsService.getPayment().subscribe((data) => {
      this.paymentList = data
    });
    if (this.userService.isLoggedIn()) {
      this.userService.getUserProfile().subscribe(
        (res: { [x: string]: any; }) => {
          this.userDetails = res['user'];
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }
  addCard(){
    // this.router.navigate(['add-card'])
  }
  deletePayment(payment: any) {
    this.paymentsService.deletePayment(payment._id).subscribe((data) => {
      this.paymentList.splice(this.paymentList.indexOf(payment), 1);
    })
  }
  editPayment(payment: any) {
    this.paymentsService.setter(payment)
    this.payment = this.paymentsService.getter();
    this.editMode = false
  }
  updatePayment() {
    this.paymentsService.updatePayment(this.payment._id,this.payment).subscribe((data) => {
      console.log(data);
    })
    this.editMode = true
  }
}
