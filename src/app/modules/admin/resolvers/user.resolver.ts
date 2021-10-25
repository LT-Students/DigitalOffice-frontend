import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { UserService } from '@app/services/user/user.service';
import { UserInfo } from '@data/api/user-service/models/user-info';

@Injectable({
	providedIn: 'root',
})
export class UserResolver implements Resolve<OperationResultResponse<UserInfo[]>> {
	constructor(private _userService: UserService) {}

	public resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<OperationResultResponse<UserInfo[]>> {
		return this._userService.findUsers({ skipCount: 0, takeCount: 10 });
	}
}
