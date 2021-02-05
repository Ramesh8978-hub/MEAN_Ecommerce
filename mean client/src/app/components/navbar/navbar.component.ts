import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from '../../models/country';
import { CountryService } from 'src/app/shared/country.service';
import { UserService } from 'src/app/shared/user.service';
import { CartService } from 'src/app/shared/cart.service';
import { Cart } from 'src/app/models/cart';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItems: Cart[] | any;

  isLoggedIn: false | any;
  userDetails:any

  constructor(
    private router: Router,
    private cartService: CartService,
    private userService: UserService,
    private adminService:AdminService
  ) { }

  ngOnInit() {
    this.cartService.getCartItems().subscribe(data => {
      this.cartItems = data;
    });
    this.userService.getUserProfile().subscribe(
      (res: { [x: string]: any; }) => {
        this.userDetails = res['user'];
      },
      (err: any) => { 
        console.log(err);
      }
    );
    if (this.userService.isLoggedIn()&&this.adminService.loggedIn()) {
      this.isLoggedIn = true;
    }
  }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
    this.isLoggedIn = false;
  }
}
