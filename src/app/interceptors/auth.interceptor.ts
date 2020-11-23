import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
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
    const token = this.localStorageService.get('id_token');
    const userId = this.localStorageService.get('userId');

    if (token && userId) {
      let headers = req.headers.set('token', token);
      headers = headers.set('userId', userId);
      const cloned = req.clone({
        headers: headers,
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
