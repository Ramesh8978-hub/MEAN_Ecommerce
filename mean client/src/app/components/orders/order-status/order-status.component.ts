import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderByProduct } from 'src/app/models/orderByProduct';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  orderByProduct: OrderByProduct | any

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderByProduct = this.orderService.getterProduct();
  }
  updateOrderStatus(form: NgForm) {
    this.orderService.updateOrderByProduct(this.orderByProduct._id, form.value).subscribe((data) => {
      console.log(data);
    });
  }

}
