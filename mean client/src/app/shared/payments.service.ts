import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  payment:Payment |any

  readonly url = "http://localhost:3000/api";

  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getPayment() {
    return this.http.get(this.url + '/getPayment', { headers: this.headers })
  }

  addPayment(payment: Payment) {
    return this.http.post(this.url + "/addPayment", payment, { headers: this.headers })
  }
  deletePayment(id: string) {
    return this.http.delete(this.url + '/deletePayment/' + id, { headers: this.headers })
  }
  updatePayment(id: string,payment: any) {
    return this.http.put(this.url + '/updataPayment/'+ id, payment, { headers: this.headers })
  }

  setter(payment: Payment) {
    this.payment = payment
  }
  getter() {
    return this.payment
  }

}
