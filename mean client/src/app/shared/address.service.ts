import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  address:Address |any

  readonly url = "http://localhost:3000/api";

  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getAddress() {
    return this.http.get(this.url + '/getAddress', { headers: this.headers })
  }

  addAddress(address: Address) {
    return this.http.post(this.url + "/addAddress", address, { headers: this.headers })
  }
  deleteAddress(id: string) {
    return this.http.delete(this.url + '/deleteAddress/' + id, { headers: this.headers })
  }
  updateAddress(address: any) {
    return this.http.put(this.url + '/updataAddress', address, { headers: this.headers })
  }

  setter(address: Address) {
    this.address = address
  }
  getter() {
    return this.address
  }

}
