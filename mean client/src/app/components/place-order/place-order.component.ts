import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/models/address';
import { Cart } from 'src/app/models/cart';
import { Payment } from 'src/app/models/payment';
import { Product } from 'src/app/models/product';
import { AddressService } from 'src/app/shared/address.service';
import { CartService } from 'src/app/shared/cart.service';
import { OrderService } from 'src/app/shared/order.service';
import { PaymentsService } from 'src/app/shared/payments.service';
import { ProductsService } from 'src/app/shared/products.service';
import { UserService } from 'src/app/shared/user.service';
import { AddressComponent } from '../address-list/address/address.component';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  addressList: Address[] | any;
  userDetails: any;
  product: Product | any;
  cart: Cart | any;
  address: Address | any;
  form: FormGroup | any;
  paymentList: Payment[] | any;
  payment: Payment | any;
  editMode = true


  productData = true;
  cartdata = true;
  selectAddress = false;
  newAddress = false;
  formHide = false;
  hideBuyButton=true;
  paymentCard=false;
  selectPaymentMethod=false;
  makePaymentHere=false

  constructor(
    private router: Router,
    private addressService: AddressService,
    private userService: UserService,
    private productService: ProductsService,
    private cartService: CartService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private paymentsService: PaymentsService,
    public dialog: MatDialog  
  ) { }

  ngOnInit(): void {
    this.paymentsService.getPayment().subscribe((data) => {
      this.paymentList = data
    });
    this.addressService.getAddress().subscribe((data) => {
      this.addressList = data
    });
    this.product = this.productService.getter();
    this.cart = this.cartService.getter();
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
    if (this.product == undefined) {
      this.productData = false;
    }
    if (this.cart == undefined) {
      this.cartdata = false;
    }
    if((this.cart == undefined)&&(this.product == undefined)){
      this.hideBuyButton=false;
    }
  }
  goToShop() {
    this.router.navigate(['/products'])
  }
  buyProduct() {
    if ((this.productData == true) && (this.cartdata == false)) {
      this.form = new FormGroup({
        name: new FormControl(this.product.name),
        imagePath: new FormControl(this.product.imagePath),
        price: new FormControl(this.product.price),
        qty: new FormControl(this.product.qty),
        email: new FormControl(this.userDetails.email),
      });
      this.orderService.placeOrderByProduct(this.form.value).subscribe((data) => {
        console.log(data);
      })
    }
    else if ((this.cartdata == true) && (this.productData == false)) {
      this.cart = this.cartService.getter();
      this.orderService.placeOrderByProduct(this.cart).subscribe((data) => {
        console.log(data);
      })
    }
    this.address = this.addressService.getter();
    this.orderService.placeOrderByUser(this.address).subscribe((data) => {
      console.log(data);
    })
    this.toastr.success('Thank You');
    this.router.navigate(['your-orders'])
  }
  selectToAddress() {
    this.selectAddress = true;
    this.newAddress = false;
  }
  selectNewToAddress(){
    this.selectAddress = false;
    this.newAddress = true;
  }
  done(address: any) {
    this.addressService.setter(address)
    this.address = this.addressService.getter();
    this.newAddress = true;
    this.selectAddress = false;
    this.paymentCard=true;
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
    this.makePaymentHere=true;
  }
  makePayment(){
    this.selectPaymentMethod=true;
  }
  newToAddress(){
    this.dialog.open(AddressComponent)
  }

}
