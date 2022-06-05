import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public toasterService: ToastrService, private router: Router) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (
            evt.body.status == 'Token is Invalid' ||
            evt.body.status == 'Token is Expired' ||
            evt.body.message == 'Token has expired'
          ) {
            this.toasterService.error('Session expired. Kindly login again!');
            localStorage.removeItem('token');
            this.router.navigateByUrl('/login');
          }
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            if(err.status == 403 || err.status == 401){
              this.toasterService.error('Unauthorized Access. Kindly login again!');
              localStorage.removeItem('token');
              this.router.navigateByUrl('/login');
            }            
            if (err.error.message == 'Token has expired') {
              this.toasterService.error('Session expired. Kindly login again!');
              localStorage.removeItem('token');
              this.router.navigateByUrl('/login');
            }
            this.toasterService.error(err.error.message, err.error.title, {
              positionClass: 'toast-bottom-center',
            });
          } catch (e) {
            this.toasterService.error('An error occurred', '', {
              positionClass: 'toast-bottom-center',
            });
          }
          //log error
        }
        return of(err);
      })
    );
  }
}
