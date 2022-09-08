import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { CurrentUserService } from '@app/services/current-user.service';
import { PermissionService } from '@app/services/permission.service';
import { User } from '@app/models/user/user.model';
import { UserRights } from '@app/types/user-rights.enum';
import { Department } from '../department-page/department';
import { ExistingDepartmentUser } from '../department-page/department-users/models/new-department-user';
import { DepartmentRole } from '../department-page/department-users/models/department-role-info';

@Injectable({
	providedIn: 'root',
})
export class DepartmentPermissionService {
	constructor(private currentUser: CurrentUserService, private permission: PermissionService) {}

	public canAccessTimeList$(department$: Observable<Department>): Observable<boolean> {
		return this.checkPermission$(UserRights.AddEditRemoveTime, department$);
	}

	public canManageDepartment$(department$: Observable<Department>): Observable<boolean> {
		return this.checkPermission$(UserRights.AddEditRemoveDepartment, department$);
	}

	private checkPermission$(right: UserRights, department$: Observable<Department>): Observable<boolean> {
		return combineLatest([this.permission.checkPermission$(right), department$]).pipe(
			switchMap(([hasPermission, department]: [boolean, Department]) => {
				if (hasPermission) {
					return of(true);
				}
				return this.currentUser.user$.pipe(
					first(),
					map((user: User) => {
						const currUser = department.users.find((u: ExistingDepartmentUser) => u.id === user.id);
						return !!currUser && currUser.role !== DepartmentRole.Employee;
					})
				);
			})
		);
	}
}
