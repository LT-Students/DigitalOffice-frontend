import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthenticationRequest } from '@data/api/auth-service/models/authentication-request';
import { AuthenticationResponse } from '@data/api/auth-service/models/authentication-response';
import { LocalStorageService } from './local-storage.service';
import { AuthApiService } from '@data/api/auth-service/services/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private authApiService: AuthApiService,
    private localStorageService: LocalStorageService
  ) {}

  login(
    authenticationRequest: AuthenticationRequest
  ): Observable<AuthenticationResponse> {
    return this.authApiService.login({ body: authenticationRequest }).pipe(
      tap({
        next: (val) => {
          this.localStorageService.set('access_token', val.token);
          this.localStorageService.set('userId', val.userId);
        },
        error: (error) => {
          console.log('Authentication failed.', error);
        },
      })
    );
  }

  isAuthenticated(): boolean {
    const token = this.localStorageService.get('access_token');
    return token != null;
  }
}
