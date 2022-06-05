import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as myGlobals from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class BasicService {

  baseUrl = myGlobals.baseUrl;

  constructor(private http: HttpClient) { }

  register(data){
    return this.http.post(`${this.baseUrl}/register`, data);
  }
  login(data){
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  addInvoice(data){
    return this.http.post(`${this.baseUrl}/addInvoice`, data);
  }

  getInvoices(){
    return this.http.get(`${this.baseUrl}/getInvoices`);
  }

  generateInvoice(id){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.get<Blob>(`${this.baseUrl}/downloadInvoicePDF/`+id,
     { headers: headers, responseType: 'blob' as 'json' }
    );
  }

}
