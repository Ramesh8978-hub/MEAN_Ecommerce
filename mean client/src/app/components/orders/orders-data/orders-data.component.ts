import { Component, Input, OnInit } from '@angular/core';
import { OrderByUser } from 'src/app/models/orderByUser';

@Component({
  selector: 'app-orders-data',
  templateUrl: './orders-data.component.html',
  styleUrls: ['./orders-data.component.css']
})
export class OrdersDataComponent implements OnInit {

  @Input() orderByUser:OrderByUser | any

  constructor() { }

  ngOnInit(): void {
  }

}
