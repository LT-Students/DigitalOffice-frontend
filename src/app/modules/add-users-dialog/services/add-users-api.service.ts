import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInfo } from '@api/filter-service/models/user-info';
import { FilterService } from '@app/services/filter/filter.service';
import { NewUserBase } from '../models';
import { FilterEvent } from '../../dynamic-filter/dynamic-filter.component';

export abstract class AddUsersApiBase<T extends NewUserBase = NewUserBase> {
	constructor(private filterService: FilterService) {}

	public abstract addUsers(entityId: string, users: T[]): Observable<unknown>;
	public abstract loadUsers(filter: FilterEvent): Observable<T[]>;

	/**
	 * Default method for getting users from API
	 * @param filter
	 * @protected
	 */
	protected findUsers({ name, departmentId }: { name: string; departmentId: string }): Observable<UserInfo[]> {
		return this.filterService
			.filterUsers({
				skipCount: 0,
				takeCount: 50,
				fullnameincludesubstring: name,
				departmentsIds: departmentId ? [departmentId] : undefined,
			})
			.pipe(map((res) => res.body || []));
	}
}
