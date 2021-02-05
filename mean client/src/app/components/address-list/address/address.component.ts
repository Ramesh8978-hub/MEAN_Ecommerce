import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/shared/address.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  address: Address | any
  userDetails: any

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.address = this.addressService.getter();
    console.log(this.address);
    
    this.userService.getUserProfile().subscribe(
      (res: { [x: string]: any; }) => {
        this.userDetails = res['user'];
      },
      (err: any) => {
        console.log(err);
      }
    );

  }
  addAddress(form: NgForm) {
    this.addressService.addAddress(form.value).subscribe((data) => {
      console.log(data);
    })
    form.reset();
    // this.router.navigate(['userProfile'])
  }

}
