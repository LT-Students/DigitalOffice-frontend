import { Injectable } from '@angular/core';
import { FilterService } from '@app/services/filter/filter.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewUserBase } from '../models/models';

export abstract class AddUsersApiBase<T extends NewUserBase = NewUserBase> {
	public abstract addUsers(entityId: string, users: T[]): Observable<unknown>;
	public abstract findUsers(name: string): Observable<T[]>;
}

@Injectable({
	providedIn: 'root',
})
export class AddUsersApiService extends AddUsersApiBase {
	constructor(private filterService: FilterService) {
		super();
	}

	public addUsers(entityId: string, users: NewUserBase[]): Observable<unknown> {
		throw new Error('Implement \'addUsers\' method!');
	}

	public findUsers(name: string): Observable<NewUserBase[]> {
		return this.filterService
			.filterUsers({ skipCount: 0, takeCount: 50, fullnameincludesubstring: name })
			.pipe(map((res) => res.body || []));
	}
}
