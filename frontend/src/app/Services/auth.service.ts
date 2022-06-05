import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import * as myGlobals from '../app.component';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  baseUrl = myGlobals.baseUrl;

  authStatus = this.loggedIn.asObservable();

  changeStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  constructor(private token: TokenService, 
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService) { }

    invalidateToken(){
      return this.http.get(`${this.baseUrl}/logout`);
    }

  logout() {
      this.invalidateToken().subscribe(
        data => {
          if(data['success']){
            localStorage.clear();
            this.token.remove();
            this.changeStatus(false);
            this.router.navigateByUrl('/login');
            this.toastr.success("Logged out successfully");
          }
        }
      )
  } 
}
