import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { DateTime } from 'luxon';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { OfficeInfo } from '@api/user-service/models/office-info';
import { PositionInfo } from '@api/user-service/models/position-info';
import { RoleInfo as UserRoleInfo } from '@api/user-service/models/role-info';
import { RoleInfo as FindRoleInfo } from '@api/rights-service/models/role-info';
import { DoValidators } from '@app/validators/do-validators';
import { PermissionService } from '@app/services/permission.service';
import { UserRights } from '@app/types/user-rights.enum';
import { formatNumber } from '@angular/common';
import { ContractSubjectData } from '@api/user-service/models/contract-subject-data';
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
		private permission: PermissionService
	) {}

	public getConfig$(): Observable<WorkInfoConfig[]> {
		return this.employeePage.selectedUser$.pipe(
			map((user: User) => {
				return [
					new WorkInfoConfig({
						label: 'Офис',
						value: user.office,
						type: 'autocomplete',
						canEdit$: this.permission.checkPermission$(UserRights.AddEditRemoveCompanyData),
						displayValueGetter: (o?: OfficeInfo) => o?.address,
						placeholder: 'Выберите офис',
						submitFn: this.editUser.changeOffice.bind(this.editUser, user),
						options$: this.editUser.findOffices.bind(this.editUser),
					}),
					new WorkInfoConfig({
						label: 'Должность',
						value: user.position,
						type: 'autocomplete',
						canEdit$: this.permission.checkPermission$(UserRights.AddEditRemovePositions),
						displayValueGetter: (p?: PositionInfo) => p?.name,
						placeholder: 'Выберите должность',
						submitFn: this.editUser.changePosition.bind(this.editUser, user),
						options$: this.editUser.findPositions.bind(this.editUser),
					}),
					new WorkInfoConfig({
						label: 'Роль',
						value: user.role,
						type: 'autocomplete',
						canEdit$: this.permission.checkPermission$(UserRights.AddRemoveUsersRoles),
						displayValueGetter: (r?: UserRoleInfo | FindRoleInfo) =>
							r && 'name' in r ? r.name : r?.localizations[0].name,
						optionDisplayValueGetter: (r?: FindRoleInfo) => r?.localizations?.[0].name,
						placeholder: 'Выберите роль',
						submitFn: this.editUser.changeRole.bind(this.editUser, user),
						options$: this.editUser.findRoles.bind(this.editUser),
					}),
					new WorkInfoConfig({
						label: 'Тип договора',
						value: user.company?.contractSubject,
						type: 'select',
						canEdit$: this.permission.checkPermission$(UserRights.AddEditRemoveCompanyData),
						displayValueGetter: (c?: ContractSubjectData) => c?.name,
						controlValueGetter: (c?: ContractSubjectData) => c?.id,
						placeholder: 'Выберите тип договора',
						submitFn: this.editUser.changeContract.bind(this.editUser, user),
						selectOption$: this.editUser.findContracts({ skipCount: 0, takeCount: 100 }),
					}),
					new WorkInfoConfig({
						label: 'Ставка',
						value: user.company?.rate,
						type: 'select',
						canEdit$: this.permission.checkPermission$(UserRights.AddEditRemoveCompanyData),
						displayValueGetter: (rate?: number) => rate && formatNumber(rate, this.locale),
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
						displayValueGetter: (date?: string) =>
							date ? DateTime.fromISO(date).toFormat('dd MMMM y') : null,
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
