import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/services/local-storage.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '@app/services/auth/auth.service';
import { CurrentUserService } from '@app/services/current-user.service';
import { CurrentCompanyService } from '@app/services/current-company.service';
import { EMPTY, iif, merge, of } from 'rxjs';
import { PortalService } from '@app/services/portal.service';
import { AdminService, PortalInfo } from '@app/services/admin/admin.service';
import { CompanyService } from '@app/services/company/company.service';
import { Company } from '@app/models/company';
import { User } from '@app/models/user/user.model';

@Injectable({
	providedIn: 'root',
})
export class AppInitService {
	constructor(
		private _currentUserService: CurrentUserService,
		private _currentCompanyService: CurrentCompanyService,
		private companyService: CompanyService,
		private portalService: PortalService,
		private adminService: AdminService,
		private _localStorage: LocalStorageService,
		private _authService: AuthService
	) {}

	public getCompanyAndUser(): Promise<void> {
		const token: string | null = this._localStorage.get('access_token');

		const userId: string | undefined = token ? (JSON.parse(atob(token.split('.')[1])).UserId as string) : undefined;
		return new Promise((resolve) => {
			this.adminService
				.isPortalExists()
				.pipe(
					tap((res) => {
						this.portalService.setPortal((res.body as PortalInfo) ?? null);
					}),
					switchMap(() =>
						iif(
							() => token !== null,
							merge(
								this._currentUserService
									.getUserOnLogin(userId)
									.pipe(tap((user: User) => this._currentUserService.setUser(user))),
								this.companyService.getCompany().pipe(
									tap((company: Company) => this._currentCompanyService.setCompany(company)),
									catchError(() => of(null))
								)
							),
							EMPTY
						)
					)
				)
				.subscribe()
				.add(resolve);
		});
	}
}
