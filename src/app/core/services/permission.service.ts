import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservedValuesFromArray, Observer, Subject, Subscriber } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserRights } from '@app/types/user-rights.enum';
import { User } from '@app/models/user/user.model';
import { CurrentUserService } from './current-user.service';

@Injectable({
	providedIn: 'root',
})
export class PermissionService {
	private assignedRights$: Observable<UserRights[]>;
	private isAdmin$: Observable<boolean>;

	constructor(private currentUserService: CurrentUserService) {
		this.assignedRights$ = this.currentUserService.user$.pipe(
			take(1),
			map((user) => user?.role?.rightsIds ?? [])
		);

		this.isAdmin$ = this.currentUserService.user$.pipe(
			take(1),
			map((user) => user.isAdmin)
		);
	}

	public isAdmin(): boolean {
		let isAdmin = false;

		this.isAdmin$.subscribe({
			next: (admin) => (isAdmin = admin),
		});

		return isAdmin;
	}

	public checkPermission(right: UserRights): boolean {
		let hasPermission = false;

		if (this.isAdmin()) {
			return true;
		} else {
			this.assignedRights$.subscribe({
				next: (rights: UserRights[]) => (hasPermission = rights.includes(right)),
			});

			return hasPermission;
		}
	}
}
