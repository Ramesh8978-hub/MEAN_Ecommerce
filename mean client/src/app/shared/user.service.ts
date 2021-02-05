import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // selectedUser:User={
  //   fullname:'',
  //   email:'',
  //   password:''
  // }

  readonly url = "http://localhost:3000/admin";


  private user: User | any

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user,this.noAuthHeader)
  }
  
  login(authCredentials: any) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader)
  }
  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

 


  setToken(token: string) {
    localStorage.setItem('token', token)
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else {
      return null;
    }
  }
  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    }
    else {
      return false;
    }
  }

  // setter(user: User) {
  //   this.user = user
  // }
  getter() {
    return this.user
  }
}
