import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { IGetUserRequest } from '@app/types/get-user-request.interface';
import { UserService } from '@app/services/user/user.service';

@Injectable({
	providedIn: 'root',
})
export class EmployeeResolver implements Resolve<User> {
	constructor(private userService: UserService) {}

	public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
		const userId = route.params['id'];
		const params: IGetUserRequest = {
			userId: userId,
			includedepartment: true,
			includeposition: true,
			includeoffice: true,
			includecommunications: true,
			includerole: true,
			includeuserimages: true,
			includeprojects: true,
			includecurrentavatar: true,
			includecompany: true,
		};

		return this.userService.getUser(params);
	}
}
