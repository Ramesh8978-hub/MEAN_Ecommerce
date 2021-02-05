import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  readonly url = "http://localhost:3000/admin";

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  adminProfile() {
    return this.http.get(this.url + '/adminProfile');
  }
  loginAdmin(user: any) {
    return this.http.post<any>(this.url + "/adminAuthenticate", user, this.noAuthHeader)
  }
  deleteToken() {
    localStorage.removeItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

}
