import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { CommunicationApiService } from '@api/user-service/services/communication-api.service';
import { catchError, mapTo, switchMap, tap } from 'rxjs/operators';
import { CommunicationInfo } from '@api/user-service/models/communication-info';
import { AlertService } from '@app/services/alert.service';
import { UsersService } from '../services/users.service';

@Injectable({
	providedIn: 'root',
})
export class EmployeeResolver implements Resolve<User> {
	constructor(
		private usersService: UsersService,
		private communicationApi: CommunicationApiService,
		private alert: AlertService
	) {}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
		return this.confirmEmail(route).pipe(
			switchMap((res: boolean | string) => {
				return this.getUser(route).pipe(
					tap((user: User) => {
						if (typeof res === 'string' && user.communications) {
							this.notifyAboutEmailConfirmation(res, user.communications);
						}
					})
				);
			})
		);
	}

	private getUser(route: ActivatedRouteSnapshot): Observable<User> {
		const userId = route.paramMap.get('id') || '';
		return this.usersService.getUser(userId);
	}

	private confirmEmail(route: ActivatedRouteSnapshot): Observable<boolean | string> {
		const secret = route.queryParamMap.get('secret');
		const communicationId = route.queryParamMap.get('communicationId');
		if (secret && communicationId) {
			return this.communicationApi.confirmCommunication({ communicationId, secret }).pipe(
				mapTo(communicationId),
				catchError(() => of(false))
			);
		}
		return of(true);
	}

	private notifyAboutEmailConfirmation(emailId: string, communications: CommunicationInfo[]): void {
		const email = communications.find((c: CommunicationInfo) => c.id === emailId)?.value;
		if (email) {
			this.alert.open(`E-mail <span class="text-accent_controls_default">${email}</span> успешно подтвержден `);
		}
	}
}
