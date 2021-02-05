import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderByProduct } from '../models/orderByProduct';
import { OrderByUser } from '../models/orderByUser';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderByUser:OrderByUser |any
  orderByProduct:OrderByProduct |any


  readonly url = "http://localhost:3000/api";

  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getOrderByUser() {
    return this.http.get(this.url + '/getOrderByUser', { headers: this.headers })
  }

  placeOrderByUser(orderByUser:OrderByUser) {
    return this.http.post(this.url + "/placeOrderByUser", orderByUser, { headers: this.headers })
  }

  getOrderByProduct() {
    return this.http.get(this.url + '/getOrderByProduct', { headers: this.headers })
  }

  placeOrderByProduct(orderByProduct:OrderByProduct) {
    return this.http.post(this.url + "/placeOrderByProduct", orderByProduct, { headers: this.headers })
  }
  deleteOrderByProduct(id: string) {
    return this.http.delete(this.url + '/deleteOrderByProduct/' + id, { headers: this.headers })
  }
  updateOrderByProduct(id: string,product: any) {
    return this.http.put(this.url + '/updateOrderByProduct/'+ id, product, { headers: this.headers })
  }
  setterUser(orderByUser: OrderByUser) {
    this.orderByUser = orderByUser
  }
  getterUser() {
    return this.orderByUser
  }
  setterProduct(orderByProduct: OrderByProduct) {
    this.orderByProduct = orderByProduct
  }
  getterProduct() {
    return this.orderByProduct
  }
}
