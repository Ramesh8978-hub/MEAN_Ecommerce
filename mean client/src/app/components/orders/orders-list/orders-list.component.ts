import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrderByProduct } from 'src/app/models/orderByProduct';
import { OrderService } from 'src/app/shared/order.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  orderByProductList: OrderByProduct[] | any;
  displayedColumns: string[] = ['imagePath', 'name', 'qty', 'price', 'action'];
  userDetails: any;

  // ELEMENT_DATA!:OrderByProduct[];
  // dataSource = new MatTableDataSource<OrderByProduct>(this.ELEMENT_DATA);

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.orderService.getOrderByProduct().subscribe((data) => {
      this.orderByProductList = data;
    })
    // this.orderService.getOrderByProduct().subscribe((report) => {
    //   this.dataSource.data=report as OrderByProduct[];
    // })
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
  deleteOrderByProduct(product: any) {
    this.orderService.deleteOrderByProduct(product._id).subscribe((data) => {
      this.orderByProductList.splice(this.orderByProductList.indexOf(product), 1);
    })
  }
  goToShop() {
    this.router.navigate(['/products'])
  }
  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  // }

}
