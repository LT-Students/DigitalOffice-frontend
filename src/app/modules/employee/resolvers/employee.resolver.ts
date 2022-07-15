import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { CommunicationApiService } from '@api/user-service/services/communication-api.service';
import { catchError, switchMap } from 'rxjs/operators';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { UsersService } from '../services/users.service';

@Injectable({
	providedIn: 'root',
})
export class EmployeeResolver implements Resolve<User> {
	constructor(private usersService: UsersService, private communicationApi: CommunicationApiService) {}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
		return this.confirmEmail(route).pipe(switchMap(() => this.getUser(route)));
	}

	private getUser(route: ActivatedRouteSnapshot): Observable<User> {
		const userId = route.paramMap.get('id') || '';
		return this.usersService.getUser(userId);
	}

	private confirmEmail(route: ActivatedRouteSnapshot): Observable<boolean | OperationResultResponse> {
		const secret = route.queryParamMap.get('secret');
		const communicationId = route.queryParamMap.get('communicationId');
		if (secret && communicationId) {
			return this.communicationApi
				.confirmCommunication({ communicationId, secret })
				.pipe(catchError(() => of(true)));
		}
		return of(true);
	}
}
