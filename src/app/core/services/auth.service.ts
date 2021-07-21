import { Injectable } from '@angular/core';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { AuthenticationRequest } from '@data/api/auth-service/models/authentication-request';
import { AuthenticationResponse } from '@data/api/auth-service/models/authentication-response';
import { AuthApiService } from '@data/api/auth-service/services/auth-api.service';
import { CredentialsApiService } from '@data/api/user-service/services/credentials-api.service';
import { CreateCredentialsRequest } from '@data/api/user-service/models/create-credentials-request';
import { UserService } from '@app/services/user.service';
import { UserResponse } from '@data/api/user-service/models/user-response';
import { HttpErrorResponse } from '@angular/common/http';
import { CredentialsResponse } from '@data/api/user-service/models/credentials-response';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(
		private authApiService: AuthApiService,
		private _userService: UserService,
		private credentialsApiService: CredentialsApiService,
		private localStorageService: LocalStorageService,
		private _router: Router
	) {}

	public login(authenticationRequest: AuthenticationRequest): Observable<UserResponse> {
		return this.authApiService.login({ body: authenticationRequest }).pipe(
			tap((authenticationInfo: AuthenticationResponse) => this._setCredentialsToLocalStorage(authenticationInfo)),
			switchMap((authResponse: AuthenticationResponse) => this._userService.getUserSetCredentials(authResponse.userId))
		);
	}

	public logout(): void {
		this._removeCredentialsFromLocalStorage();
		this._router.navigate(['/auth/login']);
	}

	public isAuthenticated(): boolean {
		const token = this.localStorageService.get('access_token');

		return token != null;
	}

	public signUp$(createCredentialsRequest: CreateCredentialsRequest): Observable<any> {
		return this.credentialsApiService.createCredentials({ body: createCredentialsRequest }).pipe(
			tap((response) => {
				//@ts-ignore TODO remove when API is fixed
				this._setCredentialsToLocalStorage(response.body);
			}),
			catchError((error: HttpErrorResponse) => {
				switch (error.status) {
					case 400:
					case 403:
					case 404: {
						return throwError(error.error.Message);
					}
					default: {
						return throwError('Упс! Возникла ошибка');
					}
				}
			})
		);
	}

	public refreshToken(): Observable<AuthenticationResponse> {
		const refreshToken: string = this.localStorageService.get('refresh_token');

		return this.authApiService.refresh({ body: { refreshToken: refreshToken } }).pipe(
			tap((authResponse: AuthenticationResponse) => {
				this._setCredentialsToLocalStorage(authResponse);
			})
		);
	}

	private _setCredentialsToLocalStorage(authenticationInfo: AuthenticationResponse | CredentialsResponse): void {
		this.localStorageService.set('access_token', authenticationInfo.accessToken);
		this.localStorageService.set('refresh_token', authenticationInfo.refreshToken);
	}

	private _removeCredentialsFromLocalStorage(): void {
		this.localStorageService.remove('access_token');
		this.localStorageService.remove('refresh_token');
		this.localStorageService.remove('user');
	}
}
