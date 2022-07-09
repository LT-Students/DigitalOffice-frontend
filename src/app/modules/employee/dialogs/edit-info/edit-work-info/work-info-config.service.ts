import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { DepartmentInfo } from '@app/models/user/department-user-info';
import { OfficeInfo } from '@api/user-service/models/office-info';
import { PositionInfo } from '@api/user-service/models/position-info';
import { RoleInfo as UserRoleInfo } from '@api/user-service/models/role-info';
import { RoleInfo as FindRoleInfo } from '@api/rights-service/models/role-info';
import { DoValidators } from '@app/validators/do-validators';
import { EmployeePageService } from '../../../services/employee-page.service';
import { EditUserService } from './edit-user.service';
import { WorkInfoConfig } from './work-info-item/work-info-item';

@Injectable()
export class WorkInfoConfigService {
	constructor(private employeePage: EmployeePageService, private editUser: EditUserService) {}

	public getConfig$(): Observable<WorkInfoConfig[]> {
		return this.employeePage.selectedUser$.pipe(
			map((user: User) => {
				return [
					new WorkInfoConfig({
						label: 'Департамент',
						value: user.department,
						type: 'autocomplete',
						displayValueGetter: (d?: DepartmentInfo) => d?.shortName,
						validators: [DoValidators.required],
						placeholder: 'Выберите департамент',
						submitFn: this.editUser.changeDepartment.bind(this.editUser, user),
						options$: this.editUser.findDepartments.bind(this.editUser),
					}),
					new WorkInfoConfig({
						label: 'Офис',
						value: user.office,
						type: 'autocomplete',
						displayValueGetter: (o?: OfficeInfo) => o?.address,
						placeholder: 'Выберите офис',
						submitFn: this.editUser.changeOffice.bind(this.editUser, user),
						options$: this.editUser.findOffices.bind(this.editUser),
					}),
					new WorkInfoConfig({
						label: 'Должность',
						value: user.position,
						type: 'autocomplete',
						displayValueGetter: (p?: PositionInfo) => p?.name,
						placeholder: 'Выберите должность',
						submitFn: this.editUser.changePosition.bind(this.editUser, user),
						options$: this.editUser.findPositions.bind(this.editUser),
					}),
					new WorkInfoConfig({
						label: 'Роль',
						value: user.role,
						type: 'autocomplete',
						displayValueGetter: (r?: UserRoleInfo | FindRoleInfo) =>
							r && 'name' in r ? r.name : r?.localizations[0].name,
						optionDisplayValueGetter: (r?: FindRoleInfo) => r?.localizations?.[0].name,
						placeholder: 'Выберите роль',
						submitFn: this.editUser.changeRole.bind(this.editUser, user),
						options$: this.editUser.findRoles.bind(this.editUser),
					}),
					new WorkInfoConfig({
						label: 'Ставка',
						value: user.company?.rate,
						type: 'select',
						placeholder: 'Выберите ставку',
						submitFn: this.editUser.changeRate.bind(this.editUser, user),
						options: [1, 0.75, 0.5, 0.25],
					}),
					new WorkInfoConfig({
						label: 'В компании с',
						value: user.company?.startWorkingAt && DateTime.fromISO(user.company.startWorkingAt),
						validators: [DoValidators.required],
						displayValueGetter: (date?: string) =>
							date ? DateTime.fromISO(date).toFormat('dd MMMM y') : null,
						type: 'date',
						submitFn: this.editUser.changeStartWorkingAt.bind(this.editUser, user),
					}),
				];
			})
		);
	}

	public updateOnSuccess(): Observable<User> {
		return this.employeePage.refreshSelectedUser();
	}
}
