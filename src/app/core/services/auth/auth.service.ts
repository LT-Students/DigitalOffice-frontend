import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { forkJoin, Observable, timer } from 'rxjs';
import { Router } from '@angular/router';

import { AuthenticationRequest } from '@api/auth-service/models/authentication-request';
import { AuthenticationResponse } from '@api/auth-service/models/authentication-response';
import { AuthApiService } from '@api/auth-service/services/auth-api.service';
import { CredentialsApiService } from '@api/user-service/services/credentials-api.service';
import { CreateCredentialsRequest } from '@api/user-service/models/create-credentials-request';
import { OperationResultResponseCredentialsResponse } from '@api/user-service/models/operation-result-response-credentials-response';
import { User } from '@app/models/user/user.model';
import { CurrentUserService } from '@app/services/current-user.service';
import { AppRoutes } from '@app/models/app-routes';
import { UserService } from '@app/services/user/user.service';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { CredentialsResponse } from '@api/user-service/models/credentials-response';
import { Company } from '@app/models/company';
import { CompanyService } from '@app/services/company/company.service';
import { CurrentCompanyService } from '@app/services/current-company.service';
import { AuthTokenService } from '@app/services/auth-token.service';
import { AuthRoutes } from '../../../modules/auth/models/auth-routes';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(
		private authApiService: AuthApiService,
		private userService: UserService,
		private currentUserService: CurrentUserService,
		private companyService: CompanyService,
		private currentCompanyService: CurrentCompanyService,
		private credentialsApiService: CredentialsApiService,
		private authToken: AuthTokenService,
		private router: Router
	) {}

	public login(authenticationRequest: AuthenticationRequest): Observable<[User, Company]> {
		return this.authApiService.login({ body: authenticationRequest }).pipe(
			tap((authResponse: AuthenticationResponse) => this.setTokens(authResponse)),
			switchMap((authResponse: AuthenticationResponse) => this.getUserAndCompany(authResponse.userId))
		);
	}

	public getUserAndCompany(userId: string): Observable<[User, Company]> {
		return forkJoin([
			this.currentUserService
				.getUserOnLogin(userId)
				.pipe(tap((user: User) => this.currentUserService.setUser(user))),
			timer(100).pipe(
				switchMap(() =>
					this.companyService
						.getCompany()
						.pipe(tap((company: Company) => this.currentCompanyService.setCompany(company)))
				)
			),
		]);
	}

	public logout(isTokenExpired = false): void {
		this.removeTokens();

		const returnUrl = this.router.url;
		this.router.navigate(
			[AppRoutes.Auth, AuthRoutes.SignIn],
			isTokenExpired && returnUrl && returnUrl !== '/'
				? {
						queryParams: {
							return: returnUrl,
						},
				  }
				: undefined
		);
	}

	public isAuthenticated(): boolean {
		const token = this.authToken.getAccessToken();

		return token != null;
	}

	public signUp$(
		createCredentialsRequest: CreateCredentialsRequest
	): Observable<OperationResultResponseCredentialsResponse> {
		return this.credentialsApiService.createCredentials({ body: createCredentialsRequest }).pipe(
			tap((response: OperationResultResponse<CredentialsResponse>) => {
				if (response.body) {
					this.setTokens(response.body);
				}
			})
		);
	}

	public reactivateUser(userId: string, password: string): Observable<OperationResultResponse<CredentialsResponse>> {
		return this.userService.reactivateUser(userId, password).pipe(
			tap((response: OperationResultResponse<CredentialsResponse>) => {
				if (response.body) {
					this.setTokens(response.body);
				}
			})
		);
	}

	public refreshToken(): Observable<AuthenticationResponse> {
		const refreshToken = this.authToken.getRefreshToken() as string;

		return this.authApiService.refresh({ body: { refreshToken } }).pipe(
			tap((authResponse: AuthenticationResponse) => {
				this.setTokens(authResponse);
			})
		);
	}

	private setTokens({ accessToken, refreshToken }: AuthenticationResponse): void {
		this.authToken.setTokens(accessToken, refreshToken);
	}

	private removeTokens(): void {
		this.authToken.removeTokens();
	}
}
