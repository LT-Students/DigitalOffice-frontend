import { Injectable } from '@angular/core';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '@app/services/auth/auth.service';
import { EMPTY, iif } from 'rxjs';
import { PortalInfoService } from '@app/services/portal-info.service';
import { AdminService } from '@app/services/admin/admin.service';
import { CompanyService } from '@app/services/company/company.service';
import { AuthTokenService } from '@app/services/auth-token.service';

@Injectable({
	providedIn: 'root',
})
export class AppInitService {
	constructor(
		private companyService: CompanyService,
		private portalService: PortalInfoService,
		private adminService: AdminService,
		private authToken: AuthTokenService,
		private authService: AuthService
	) {}

	public getCompanyAndUser(): Promise<void> {
		const token = this.authToken.getAccessToken();
		const userId = this.authToken.getUserId();

		return new Promise((resolve) => {
			this.adminService
				.isPortalExists()
				.pipe(
					tap((res) => {
						this.portalService.setPortal(res.body || null);
					}),
					switchMap(() =>
						iif(
							() => token !== null,
							this.authService.getUserAndCompany(userId ?? '').pipe(
								catchError(() => {
									this.authService.logout();
									return EMPTY;
								})
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
