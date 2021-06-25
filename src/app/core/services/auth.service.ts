import { Injectable } from '@angular/core';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { AuthenticationRequest } from '@data/api/auth-service/models/authentication-request';
import { AuthenticationResponse } from '@data/api/auth-service/models/authentication-response';
import { AuthApiService } from '@data/api/auth-service/services/auth-api.service';
import { CredentialsApiService } from '@data/api/user-service/services/credentials-api.service';
import { CreateCredentialsRequest } from '@data/api/user-service/models/create-credentials-request';
import { CredentialsResponse } from '@data/api/user-service/models/credentials-response';
import { UserService } from '@app/services/user.service';
import { UserResponse } from '@data/api/user-service/models/user-response';
import { HttpErrorResponse } from '@angular/common/http';
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

	login(authenticationRequest: AuthenticationRequest): Observable<UserResponse> {
		return this.authApiService.login({ body: authenticationRequest }).pipe(
			tap((authenticationInfo: AuthenticationResponse) => this.localStorageService.set('access_token', authenticationInfo.token)),
			switchMap((authResponse: AuthenticationResponse) => this._userService.getUser(authResponse.userId))
		);
	}

	logout() {
		this._removeCredentialsFromLocalStorage();
		this._router.navigate(['/auth/login']);
	}

	isAuthenticated(): boolean {
		const token = this.localStorageService.get('access_token');
		return token != null;
	}

	signUp$(createCredentialsRequest: CreateCredentialsRequest): Observable<CredentialsResponse> {
		return this.credentialsApiService.createCredentials({ body: createCredentialsRequest }).pipe(
			tap((authenticationInfo: AuthenticationResponse) => this._setCredentialsToLocalStorage(authenticationInfo)),
			catchError((error: HttpErrorResponse) => {
				switch (error.status) {
					case 400: {
						return throwError(error.error.Message);
						break;
					}
					case 403: {
						return throwError(error.error.Message);
						break;
					}
					case 404: {
						return throwError(error.error.Message);
						break;
					}
					default: {
						return throwError('Упс! Возникла ошибка');
						break;
					}
				}
			})
		);
	}

	private _setCredentialsToLocalStorage(authenticationInfo: AuthenticationResponse) {
		this.localStorageService.set('access_token', authenticationInfo.token);
	}

	private _removeCredentialsFromLocalStorage() {
		this.localStorageService.remove('access_token');
		this.localStorageService.remove('user');
	}
}
