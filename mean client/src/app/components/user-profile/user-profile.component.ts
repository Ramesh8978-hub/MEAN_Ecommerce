import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { UserService } from 'src/app/shared/user.service';
import { AddressComponent } from '../address-list/address/address.component';
import { AddPaymentComponent } from '../payments/add-payment/add-payment.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails: any;
  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
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
  goToShop() {
    this.router.navigate(['/products'])
  }
  addAddress() {
    this.dialog.open(AddressComponent)
  }
  addCard() {
    this.dialog.open(AddPaymentComponent)
  }

}
