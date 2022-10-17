import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInfo } from '@api/filter-service/models/user-info';
import { FilterService } from '@app/services/filter/filter.service';
import { NewUserBase } from '../models/models';

export abstract class AddUsersApiBase<T extends NewUserBase = NewUserBase> {
	constructor(private filterService: FilterService) {}

	public abstract addUsers(entityId: string, users: T[]): Observable<unknown>;
	public abstract loadUsers(name: string): Observable<T[]>;

	/**
	 * Get users from API
	 * @param name
	 * @protected
	 */
	protected findUsers(name: string): Observable<UserInfo[]> {
		return this.filterService
			.filterUsers({ skipCount: 0, takeCount: 50, fullnameincludesubstring: name })
			.pipe(map((res) => res.body || []));
	}
}

@Injectable({
	providedIn: 'root',
})
export class AddUsersApiService extends AddUsersApiBase {
	constructor(filterService: FilterService) {
		super(filterService);
	}

	public addUsers(entityId: string, users: NewUserBase[]): Observable<unknown> {
		throw new Error("Implement 'addUsers' method!");
	}

	public loadUsers(name: string): Observable<NewUserBase[]> {
		return super.findUsers(name);
	}
}
