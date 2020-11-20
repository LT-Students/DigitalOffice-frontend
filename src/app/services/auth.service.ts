import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthenticationRequest, AuthenticationService, AuthenticationResponse } from '@digital-office/api/auth-service';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private authService: AuthenticationService,
    private localStorageService: LocalStorageService
  ) {}

  login(
    authenticationRequest: AuthenticationRequest
  ): Observable<AuthenticationResponse> {
    return this.authService.loginPost(authenticationRequest).pipe(
      tap({
        next: (val) => {
          this.localStorageService.set('id_token', val.token);
          this.localStorageService.set('userId', val.userId);
        },
        error: (error) => {
          console.log('Authentication failed.', error);
        },
      })
    );
  }

  isAuthenticated(): boolean {
    const token = this.localStorageService.get('id_token');
    return token != null;
  }
}
