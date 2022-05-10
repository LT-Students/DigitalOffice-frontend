import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservedValuesFromArray, Observer, Subject, Subscriber } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserRights } from '@app/types/user-rights.enum';
import { CurrentUserService } from './current-user.service';

@Injectable({
	providedIn: 'root',
})
export class PermissionService {
	private assignesRights$: Observable<UserRights[]>;

	constructor(private currentUserService: CurrentUserService) {
		this.assignesRights$ = this.currentUserService.user$.pipe(
			map((user) => user?.role?.rightsIds ?? []),
			take(1)
		);
	}

	public checkPermission(right: UserRights): boolean {
		let isAdmin = false;
		let hasPermission = false;

		this.currentUserService.user$
			.pipe(
				map((user) => user.isAdmin),
				take(1)
			)
			.subscribe({
				next: (admin) => (isAdmin = admin),
			});

		if (isAdmin) {
			return true;
		} else {
			this.assignesRights$.subscribe({
				next: (rights: UserRights[]) => (hasPermission = rights.includes(right)),
			});

			return hasPermission;
		}
	}
}
