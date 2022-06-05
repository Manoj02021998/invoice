import { Injectable } from '@angular/core';
import * as myGlobals from '../app.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private baseUrl = myGlobals.baseUrl;

  constructor(private http: HttpClient) { }

  private iss = {
    login: myGlobals.baseUrl + '/login',
    signup: myGlobals.baseUrl + '/signup'
  };

  handle(token) {
    this.set(token);
    this.isValid();
  }

  set(token) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      // console.log(payload)
      return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }

  verifyToken(token){
    return this.http.get(`${this.baseUrl}/verifyToken?token=` + token);
  }
}
