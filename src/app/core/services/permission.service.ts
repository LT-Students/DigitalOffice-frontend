import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservedValuesFromArray, Observer, Subject, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRights } from '@app/types/user-rights.enum';
import { CurrentUserService } from './current-user.service';

@Injectable({
	providedIn: 'root',
})
export class PermissionService {
	private assignesRights$: Observable<UserRights[]>;
	private _doesHaveRight = new BehaviorSubject<boolean>(false);

	constructor(private currentUserService: CurrentUserService) {
		this.assignesRights$ = this.currentUserService.user$.pipe(map((user) => user?.role?.rightsIds ?? []));
	}

	public checkPermission(_right: number): boolean {
		const _isAdmin = this.currentUserService.user$.pipe(map((user) => user.isAdmin));

		if (_isAdmin) {
			return true;
		} else {
			this.assignesRights$.subscribe({
				next: (rights: UserRights[]) => {
					if (rights.includes(_right)) {
						this._doesHaveRight.next(true);
					}
				},
			});

			if (this._doesHaveRight.getValue()) {
				return true;
			} else {
				return false;
			}
		}
	}
}
