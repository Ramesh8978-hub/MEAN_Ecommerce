import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { Product } from 'src/app/models/product';
import { AddressService } from 'src/app/shared/address.service';
import { ProductsService } from 'src/app/shared/products.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  addressList: Address[] | any;
  address: Address | any;
  userDetails: any;
  product: Product | any;

  editMode = true
  constructor(
    private router: Router,
    private addressService: AddressService,
    private userService: UserService,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.addressService.getAddress().subscribe((data) => {
      this.addressList = data
    });
    this.product = this.productService.getter();
    
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
  addAddress() {
    // this.router.navigate(['address'])
  }
  deleteAddress(address: any) {
    this.addressService.deleteAddress(address._id).subscribe((data) => {
      this.addressList.splice(this.addressList.indexOf(address), 1);
    })
  }
  editAddress(address: any) {
    this.addressService.setter(address)
    this.address = this.addressService.getter();
    this.editMode = false
  }
  updateAddress() {
    this.addressService.updateAddress(this.address).subscribe((data) => {
      console.log(data);
    })
    this.editMode = true
  }

}
