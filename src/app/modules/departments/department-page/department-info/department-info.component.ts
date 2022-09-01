import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { combineLatest, Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { UserRights } from '@app/types/user-rights.enum';
import { PermissionService } from '@app/services/permission.service';
import { CurrentUserService } from '@app/services/current-user.service';
import { DepartmentUserRole } from '@api/department-service/models/department-user-role';
import { DepartmentUserInfo } from '@api/department-service/models/department-user-info';
import { DepartmentsRoutes } from '../../models/departments-routes';
import { Department } from '../department';
import { DepartmentPageStateService } from '../../department-id-route-container/department-page-state.service';

@Component({
	selector: 'do-department-info',
	templateUrl: './department-info.component.html',
	styleUrls: ['./department-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentInfoComponent implements OnInit {
	public readonly Icons = Icons;
	public readonly DepartmentsRoutes = DepartmentsRoutes;

	@Input() department!: Department;

	public canAccessTimeList$ = this.canAccessTimeList();
	public canEditDepartment$ = this.canEditDepartment();

	constructor(
		private permission: PermissionService,
		private currentUser: CurrentUserService,
		private departmentState: DepartmentPageStateService
	) {}

	ngOnInit(): void {}

	private canAccessTimeList(): Observable<boolean> {
		return combineLatest([this.currentUser.user$, this.departmentState.department$]).pipe(
			map(([user, department]: [User, Department]) => {
				if (user.isAdmin) {
					return true;
				} else {
					const currUser = department.users.find((u: DepartmentUserInfo) => u.userId === user.id);
					return !!currUser && currUser.role === DepartmentUserRole.Manager;
				}
			})
		);
	}

	private canEditDepartment(): Observable<boolean> {
		return this.permission.checkPermission$(UserRights.AddEditRemoveDepartment).pipe(
			first(),
			switchMap((hasPermission: boolean) => {
				if (hasPermission) {
					return of(true);
				} else {
					return combineLatest([this.currentUser.user$, this.departmentState.department$]).pipe(
						map(([user, department]: [User, Department]) => {
							const currUser = department.users.find((u: DepartmentUserInfo) => u.userId === user.id);
							return !!currUser && currUser.role === DepartmentUserRole.Manager;
						})
					);
				}
			})
		);
	}
}
