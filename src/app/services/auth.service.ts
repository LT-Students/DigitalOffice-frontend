import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';
import { AuthenticationRequest, AuthenticationResponse, AuthenticationService } from '../../../libs/api/src/lib/auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authService: AuthenticationService,
    private localStorageService: LocalStorageService) {
  }

  login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.authService.loginPost(authenticationRequest)
      .pipe(
        tap({
          next: val => {
            this.localStorageService.set('id_token', val.token);
          },
          error: error => {
            console.log('Authentication failed.', error);
          }
        }));
  }

  isAuthenticated(): boolean {
    const token = this.localStorageService.get('id_token');
    return token != null;
  }
}
