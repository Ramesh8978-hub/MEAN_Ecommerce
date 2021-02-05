import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AdminService } from 'src/app/shared/admin.service';
import { ProductsService } from 'src/app/shared/products.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('*=>*', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('100ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75px)', offset: 0 }),
            // style({ opacity: .5, transform: 'translateX(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))
        ]))
      ])
    ])
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {
  isLoggedIn: false | any;

  products: Product[] = [];
  product: Product | any;

  Shoes = "shoe";
  Watches = "watch";
  Earphone = "ear";
  Sandals = "sand";
  Trimmer = "trimmer";

  p: number = 1;


  private productSubscription: Subscription | any;

  constructor(
    private productsService: ProductsService,
    private adminService: AdminService,
    private router: Router,
    private userService: UserService,

  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.adminService.adminProfile().subscribe((data)=>{
      console.log(data);
      
    })
    if (!this.userService.isLoggedIn() && this.adminService.loggedIn()) {
      this.isLoggedIn = true;
    }
    this.productSubscription = this.productsService
      .getProductsStream()
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }
  loadProducts() {
    this.productsService.getProducts();

  }
  newProduct() {
    this.router.navigate(['/addProduct'])
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }

}
