import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // private products: Product[] = [];
  // private products$ = new Subject<Product[]>();
  // subject = new Subject()

  private cart: Cart | any

  readonly url = "http://localhost:3000/api";
  
  private headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }
  getCartItems() {
    return this.http.get(this.url + '/getCartItems', { headers: this.headers })
  }
  deleteCartItems(id: string) {
    return this.http.delete(this.url + '/deleteCartItems/' + id, { headers: this.headers })
  }

  addProductToCart(cart: Cart) {
    return this.http.post(this.url + '/addToCart', cart, { headers: this.headers })
  }
  updateCartItems(cart: any) {
    return this.http.put(this.url + '/updataCartItems', cart, { headers: this.headers })
  }
  setter(cart: Cart) {
    this.cart = cart
  }
  getter() {
    return this.cart
  }
}
