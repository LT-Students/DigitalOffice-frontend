import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.localStorageService.get('access_token');
    let headers: HttpHeaders = req.headers.set('Access-Control-Allow-Origin','*');

    if (token) {
      headers = headers.set('token', token);
    }
    const cloned = req.clone({ headers });

    return next.handle(cloned);
  }
}
