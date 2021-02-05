import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductsEditComponent } from 'src/app/components/products-list/products-edit/products-edit.component';
import { AdminService } from 'src/app/shared/admin.service';
import { CartService } from 'src/app/shared/cart.service';
import { ProductsService } from 'src/app/shared/products.service';
import { UserService } from 'src/app/shared/user.service';
import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-products-data',
  templateUrl: './products-data.component.html',
  styleUrls: ['./products-data.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('*=>*', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('100ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateX(-85px)', offset: 0 }),
            // style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))
        ]))
      ])
    ])
  ]
})
export class ProductsDataComponent implements OnInit {

  @Input() productData: Product | any;
  productList:Product[] |any
  userDetails: any
  formHide = false;
  priceHide=false;
  form: FormGroup | any

  product: Product | any
  isLoggedIn = false;

  constructor(
    private cartService: CartService,
    private productService: ProductsService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private adminService: AdminService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.userService.isLoggedIn() && this.adminService.loggedIn()) {
      this.isLoggedIn = true;
    }
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

  addProductToCart(product: any) {
    this.productService.setter(product);
    this.product = this.productService.getter();
    this.form = new FormGroup({
      name: new FormControl(this.product.name),
      imagePath: new FormControl(this.product.imagePath),
      price: new FormControl(this.product.price),
      qty: new FormControl(this.product.qty),
      email: new FormControl(this.userDetails.email),
    });
    this.cartService.addProductToCart(this.form.value).subscribe((data) => {
      console.log(data);
      this.toastr.success('Added To Cart');
    },
      err => {
        this.toastr.error('This Item was already added to cart.');
      }
    );
  }
  placeOrder(product: any) {
    this.productService.setter(product);
    this.product = this.productService.getter();
    console.log(this.product);

    this.router.navigate(['place-order']);
  }
  editProduct(product: any) {
    this.productService.setter(product);
    this.product = this.productService.getter();
    console.log(this.product);
    this.dialog.open(ProductsEditComponent)
  }
  deleteProduct(product: any){
    this.productService.deleteProduct(product._id).subscribe((data) => {
      this.productList.splice(this.productList.indexOf(product), 1);
    })
  }

}
