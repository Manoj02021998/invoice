import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
     if (localStorage.getItem('token')) {
      const authToken = 'Bearer ' + localStorage.getItem('token');
      const authReq = req.clone({
        setHeaders: { Authorization: authToken },
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
