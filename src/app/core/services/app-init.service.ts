//@ts-nocheck
import { Injectable } from '@angular/core';
import { UserService } from '@app/services/user/user.service';
import { LocalStorageService } from '@app/services/local-storage.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AuthService } from '@app/services/auth/auth.service';
import { CompanyService } from '@app/services/company/company.service';

@Injectable({
	providedIn: 'root',
})
export class AppInitService {
	constructor(
		private _userService: UserService,
		private _companyService: CompanyService,
		private _localStorage: LocalStorageService,
		private _authService: AuthService,
	) {}

	public getCompany(): Promise<any> {
		return new Promise((resolve) => {
			this._companyService.getCompany().subscribe().add(resolve);
		});
	}

	public getCurrentUser(): Promise<any> {
		const token: string | null = this._localStorage.get('access_token');

		if (token) {
			const userId: string = JSON.parse(atob(token.split('.')[1])).UserId;

			return new Promise((resolve) => {
				this._userService
				.getUserSetCredentials(userId)
				.pipe(
					catchError((error: HttpErrorResponse) => {
						this._authService.logout();
						return throwError(error.error.errors);
					}),
				)
				.subscribe()
				.add(resolve);
			});
		}
	}
}
