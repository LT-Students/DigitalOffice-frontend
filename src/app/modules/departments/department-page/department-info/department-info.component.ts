import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { DepartmentsRoutes } from '../../models/departments-routes';
import { Department } from '../department';
import { DepartmentPageStateService } from '../../department-id-route-container/department-page-state.service';
import { DepartmentPermissionService } from '../../services/department-permission.service';

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

	public canAccessTimeList$ = this.departmentPermissions.canAccessTimeList$(this.departmentState.department$);
	public canEditDepartment$ = this.departmentPermissions.canManageDepartment$(this.departmentState.department$);

	constructor(
		private departmentState: DepartmentPageStateService,
		private departmentPermissions: DepartmentPermissionService
	) {}

	ngOnInit(): void {}
}
