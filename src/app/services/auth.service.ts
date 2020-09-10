import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IAuthenticationRequest, IAuthenticationResponse } from '../interfaces/auth/auth.interface';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService) { }

  login(authenticationRequest: IAuthenticationRequest): Observable<IAuthenticationResponse> {
    console.log(environment.authenticationServiceUri + '/Authentication/login');
    return this.http.post<IAuthenticationResponse>(environment.authenticationServiceUri + '/Authentication/login', authenticationRequest)
            .pipe(
              tap({
                next: val => {
                  this.localStorageService.set('id_token', val.jwtToken);
                },
                error: error => {
                  console.log('Authentication failed.', error);
                }
              }));
  }

  isAuthenticated(): boolean {
    const token = this.localStorageService.get('id_token');
    return true;
  }
}
