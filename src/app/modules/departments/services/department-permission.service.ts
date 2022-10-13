import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { CurrentUserService } from '@app/services/current-user.service';
import { PermissionService } from '@app/services/permission.service';
import { User } from '@app/models/user/user.model';
import { UserRights } from '@app/types/user-rights.enum';
import { DepartmentUserRole } from '@api/user-service/models/department-user-role';

@Injectable({
	providedIn: 'root',
})
export class DepartmentPermissionService {
	constructor(private currentUser: CurrentUserService, private permission: PermissionService) {}

	public canAccessTimeList$(departmentId$: Observable<string>): Observable<boolean> {
		return this.checkPermission$(UserRights.AddEditRemoveTime, departmentId$);
	}

	public canManageUsers$(departmentId$: Observable<string>): Observable<boolean> {
		return this.checkPermission$(UserRights.AddEditRemoveDepartment, departmentId$);
	}

	public canEditDepartment$(): Observable<boolean> {
		return this.permission.checkPermission$(UserRights.AddEditRemoveDepartment);
	}

	public canTransferProjects$(departmentId: string): Observable<boolean> {
		return this.currentUser.user$.pipe(
			map(
				(user: User) =>
					user.isAdmin ||
					(user.department?.id === departmentId && user.department.role === DepartmentUserRole.Manager)
			)
		);
	}

	private checkPermission$(right: UserRights, departmentId$: Observable<string>): Observable<boolean> {
		return combineLatest([this.permission.checkPermission$(right), departmentId$]).pipe(
			switchMap(([hasPermission, departmentId]: [boolean, string]) => {
				if (hasPermission) {
					return of(true);
				}
				return this.currentUser.user$.pipe(
					first(),
					map(
						(user: User) =>
							user.department?.id === departmentId && user.department.role === DepartmentUserRole.Manager
					)
				);
			})
		);
	}
}
