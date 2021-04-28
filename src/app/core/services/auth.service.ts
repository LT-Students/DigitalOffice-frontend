import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthenticationRequest } from '@data/api/auth-service/models/authentication-request';
import { AuthenticationResponse } from '@data/api/auth-service/models/authentication-response';
import { AuthApiService } from '@data/api/auth-service/services/auth-api.service';
import { LocalStorageService } from './local-storage.service';
import { CredentialsApiService } from '@data/api/user-service/services/credentials-api.service';
import { CreateCredentialsRequest } from '@data/api/user-service/models/create-credentials-request';
import { CredentialsResponse } from '@data/api/user-service/models/credentials-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private authApiService: AuthApiService,
    private credentialsApiService: CredentialsApiService,
    private localStorageService: LocalStorageService
  ) {}

  login(
      authenticationRequest: AuthenticationRequest,
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
        }),
    );
  }

  isAuthenticated(): boolean {
    const token = this.localStorageService.get('access_token');
    return token != null;
  }

  signUp$(createCredentialsRequest: CreateCredentialsRequest): Observable<CredentialsResponse> {
    return this.credentialsApiService.createCredentials({ body: createCredentialsRequest }).pipe(
        tap((val: AuthenticationResponse) => {
            this.localStorageService.set('access_token', val.token);
            this.localStorageService.set('userId', val.userId);
        }),
    );
  }
}
