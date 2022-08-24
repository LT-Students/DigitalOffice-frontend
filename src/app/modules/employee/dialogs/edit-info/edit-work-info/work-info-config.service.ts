import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { DateTime } from 'luxon';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { RoleInfo as UserRoleInfo } from '@api/user-service/models/role-info';
import { RoleInfo as FindRoleInfo } from '@api/rights-service/models/role-info';
import { DoValidators } from '@app/validators/do-validators';
import { PermissionService } from '@app/services/permission.service';
import { UserRights } from '@app/types/user-rights.enum';
import { formatNumber } from '@angular/common';
import { AutocompleteConfigsService } from '@shared/component/autocomplete/autocomplete-configs.service';
import { EmployeePageService } from '../../../services/employee-page.service';
import { EditUserService } from './edit-user.service';
import { WorkInfoConfig } from './work-info-item/work-info-item';
import { IsAdminStatusConfig } from './is-admin-status/is-admin-status.component';

@Injectable()
export class WorkInfoConfigService {
	constructor(
		@Inject(LOCALE_ID) private locale: string,
		private employeePage: EmployeePageService,
		private editUser: EditUserService,
		private permission: PermissionService,
		private autocompleteConfigs: AutocompleteConfigsService
	) {}

	public getConfig$(): Observable<WorkInfoConfig[]> {
		return this.employeePage.selectedUser$.pipe(
			map((user: User) => {
				return [
					// new WorkInfoConfig({
					// 	...this.autocompleteConfigs.getOfficesConfig(),
					// 	label: 'Офис',
					// 	value: user.office,
					// 	type: 'autocomplete',
					// 	canEdit$: this.permission.checkPermission$(UserRights.AddEditRemoveCompanyData),
					// 	placeholder: 'Выберите офис',
					// 	submitFn: this.editUser.changeOffice.bind(this.editUser, user),
					// }),
					new WorkInfoConfig({
						...this.autocompleteConfigs.getPositionsConfig(),
						label: 'Должность',
						value: user.position,
						type: 'autocomplete',
						canEdit$: this.permission.checkPermission$(UserRights.AddEditRemovePositions),
						placeholder: 'Выберите должность',
						submitFn: this.editUser.changePosition.bind(this.editUser, user),
					}),
					new WorkInfoConfig({
						...this.autocompleteConfigs.getRolesConfig(),
						label: 'Роль',
						value: user.role,
						type: 'autocomplete',
						canEdit$: this.permission.checkPermission$(UserRights.AddRemoveUsersRoles),
						placeholder: 'Выберите роль',
						submitFn: this.editUser.changeRole.bind(this.editUser, user),
						displayWithFn: (r?: UserRoleInfo | FindRoleInfo) =>
							r && 'name' in r ? r.name : r?.localizations[0].name,
					}),
					new WorkInfoConfig({
						...this.autocompleteConfigs.getContractsConfig(),
						label: 'Тип договора',
						value: user.company?.contractSubject,
						type: 'select',
						canEdit$: this.permission.checkPermission$(UserRights.AddEditRemoveCompanyData),
						placeholder: 'Выберите тип договора',
						submitFn: this.editUser.changeContract.bind(this.editUser, user),
					}),
					new WorkInfoConfig({
						label: 'Ставка',
						value: user.company?.rate,
						type: 'select',
						canEdit$: this.permission.checkPermission$(UserRights.AddEditRemoveCompanyData),
						displayWithFn: (rate?: number) => rate && formatNumber(rate, this.locale),
						placeholder: 'Выберите ставку',
						submitFn: this.editUser.changeRate.bind(this.editUser, user),
						options: [1, 0.75, 0.5, 0.25],
					}),
					new WorkInfoConfig({
						label: 'В компании с',
						type: 'date',
						value: user.company?.startWorkingAt && DateTime.fromISO(user.company.startWorkingAt),
						canEdit$: this.permission.checkPermission$(UserRights.AddEditRemoveCompanyData),
						validators: [DoValidators.required],
						displayWithFn: (date?: string) => (date ? DateTime.fromISO(date).toFormat('dd MMMM y') : null),
						submitFn: this.editUser.changeStartWorkingAt.bind(this.editUser, user),
					}),
				];
			})
		);
	}

	public adminCheckboxConfig$(): Observable<IsAdminStatusConfig> {
		return combineLatest([this.employeePage.selectedUser$, this.permission.isAdmin$]).pipe(
			map(([user, isCurrentUserAdmin]: [User, boolean]) => ({
				isAdmin: user.isAdmin,
				disabled: !isCurrentUserAdmin,
				submitFn: this.editUser.changeAdminStatus.bind(this.editUser, user.id),
			}))
		);
	}

	public updateOnSuccess(): Observable<User> {
		return this.employeePage.refreshSelectedUser();
	}
}
