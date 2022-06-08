import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserRights } from '@app/types/user-rights.enum';
import { User } from '@app/models/user/user.model';
import { CurrentUserService } from './current-user.service';

@Injectable({
	providedIn: 'root',
})
export class PermissionService {
	public readonly isAdmin$ = this.currentUserService.user$.pipe(map((user: User) => user.isAdmin));
	private readonly assignedRights$ = this.currentUserService.user$.pipe(
		map((user: User) => user.role?.rightsIds ?? [])
	);

	constructor(private currentUserService: CurrentUserService) {}

	public checkPermission$(right: UserRights): Observable<boolean> {
		return this.isAdmin$.pipe(
			switchMap((isAdmin: boolean) =>
				isAdmin ? of(isAdmin) : this.assignedRights$.pipe(map((rights: UserRights[]) => rights.includes(right)))
			)
		);
	}
}
