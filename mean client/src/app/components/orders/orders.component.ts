import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderByProduct } from 'src/app/models/orderByProduct';
import { OrderByUser } from 'src/app/models/orderByUser';
import { OrderService } from 'src/app/shared/order.service';
import { OrderStatusComponent } from './order-status/order-status.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderByUserList: OrderByUser[] | any;
  orderByProductList: OrderByProduct[] | any;
  user:OrderByUser|any;
  product:OrderByProduct|any;
  email:any
  orderByProduct: OrderByProduct | any


  orderByProductTable = false;
  noData=false

  constructor(
    private orderService: OrderService,
    private router:Router,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.orderService.getOrderByUser().subscribe((data) => {
      this.orderByUserList = data;
    })
    this.orderService.getOrderByProduct().subscribe((data) => {
      this.orderByProductList = data;
    })
  }

  viewOrderByProductTable(user:any) {
    this.orderService.setterUser(user);
    this.user =this.orderService.getterUser();
    this.email = this.user.email;
    this.orderByProductTable = true
  }
  goToShop() {
    this.router.navigate(['/products'])
  }
  updateOrderStatus(product:any){
    this.orderService.setterProduct(product);
    this.dialog.open(OrderStatusComponent)
  }

}
