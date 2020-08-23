import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IAuthenticationRequest, IAuthenticationResponse } from '../interfaces/auth/auth.interface'
import { LocalStorageService } from './local-storage.service';

const authenticationServiceUri = 'https://localhost:9816/AuthenticationService';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService) { }

  login(authenticationRequest: IAuthenticationRequest): Observable<IAuthenticationResponse> {
    return this.http.post<IAuthenticationResponse>(authenticationServiceUri, authenticationRequest)
            .pipe(
              tap({
                next: val => {
                  this.localStorageService.set("id_token", val.jwt);
                },
                error: error => {
                  console.log('Authentication failed.', error.message);
                }
              }));
  }

  isAuthenticated():boolean{
    const token = this.localStorageService.get("id_token");
    return token != null;
  }
}
