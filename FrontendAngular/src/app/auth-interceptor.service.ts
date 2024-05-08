import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const mytoken = localStorage.getItem('access_token');

    if (mytoken !== null) {
      const cloneRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${mytoken}`
        }
      });
      return next.handle(cloneRequest);
    } else {
      return next.handle(req);
    }
  }
}
