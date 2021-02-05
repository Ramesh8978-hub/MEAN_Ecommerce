import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/shared/cart.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  cartItems: Cart[] | any;
  cart: Cart | any;
  userDetails: any;
  total:any
cartTotal=0

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
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
    this.cartTotal=this.total.value;
    console.log(this.total.value);
    
  }
  loadProducts() {
    this.cartService.getCartItems().subscribe(data => {
      this.cartItems = data;
    });
  }
  deleteCartItems(cartItem: any) {
    this.cartService.deleteCartItems(cartItem._id).subscribe((data) => {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    })
  }
  increaseQty(cartItem: any) {
    const qty = cartItem.qty++;
    this.cartService.setter(cartItem);
    this.cart = this.cartService.getter();
    this.cartService.updateCartItems(this.cart).subscribe((data) => {
      console.log(data);
    })
  }

  decreaseQty(cartItem: any) {
    cartItem.qty--;
    this.cartService.setter(cartItem);
    this.cart = this.cartService.getter();
    this.cartService.updateCartItems(this.cart).subscribe((data) => {
      console.log(data);
    })
  }
  goToShop(){
    this.router.navigate(['/products'])
}
onCheckOut(cartItem: any){
  this.cartService.setter(cartItem);
  this.router.navigate(['/place-order'])
}
  // search() {
  //   if (this.userDetails.email == "") {
  //     this.loadProducts();
  //   }
  //   else {
  //     this.cartItems = this.cartItems.filter((res: { email: string; }) => {
  //       return res.email.toLocaleLowerCase().match(this.email.toLocaleLowerCase());
  //     })
  //   }
  // }

}
