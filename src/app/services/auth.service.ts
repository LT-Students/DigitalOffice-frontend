import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environments/environment';
import { AuthenticationRequest, AuthenticationResponse } from '../../../libs/api/src/lib/auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService) {
  }

  login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    console.log(environment.authenticationServiceUri + '/Authentication/login');
    return this.http.post<AuthenticationResponse>(environment.authenticationServiceUri + '/Authentication/login', authenticationRequest)
      .pipe(
        tap({
          next: val => {
            this.localStorageService.set('id_token', val.jwt);
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
