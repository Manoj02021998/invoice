import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHeaderInterceptor } from './app-header-interceptor';
import { AuthInterceptor } from './app-auth-interceptor';
import { LoaderInterceptor } from './app-loader-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true },
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: ApplicationJsonHeaderInterceptor,
  //   multi: true,
  // },
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
