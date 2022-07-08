import { Injectable } from '@angular/core';
import { DepartmentUserApiService } from '@api/department-service/services/department-user-api.service';
import { DepartmentApiService } from '@api/department-service/services/department-api.service';
import { OfficeApiService } from '@api/office-service/services/office-api.service';
import { OfficeUsersApiService } from '@api/office-service/services/office-users-api.service';
import { PositionUserApiService } from '@api/position-service/services/position-user-api.service';
import { PositionApiService } from '@api/position-service/services/position-api.service';
import { UserRoleApiService } from '@api/rights-service/services/user-role-api.service';
import { RoleApiService } from '@api/rights-service/services/role-api.service';
import { CompanyUserApiService } from '@api/company-service/services/company-user-api.service';
import { DepartmentUserAssignment } from '@api/department-service/models/department-user-assignment';
import { DepartmentUserRole } from '@api/department-service/models/department-user-role';
import { EMPTY, Observable } from 'rxjs';
import { DateTime } from 'luxon';
import { User } from '@app/models/user/user.model';

interface FindParams {
	takeCount: number;
	skipCount: number;
	nameIncludeSubstring?: string;
}

@Injectable({
	providedIn: 'root',
})
export class EditUserService {
	constructor(
		private departmentUser: DepartmentUserApiService,
		private department: DepartmentApiService,
		private officeUser: OfficeUsersApiService,
		private office: OfficeApiService,
		private positionUser: PositionUserApiService,
		private position: PositionApiService,
		private roleUser: UserRoleApiService,
		private role: RoleApiService,
		private companyUser: CompanyUserApiService
	) {}

	/**
	 * find methods
	 */
	public findDepartments(params: FindParams) {
		return this.department.findDepartments(params);
	}

	public findOffices(params: FindParams) {
		return this.office.findOffices(params);
	}

	public findPositions(params: FindParams) {
		return this.position.findPositions(params);
	}

	public findRoles(params: FindParams) {
		return this.role.findRoles({ ...params, locale: 'ru' });
	}

	/**
	 * Submit methods
	 */
	public changeDepartment(user: User, departmentId: string): Observable<any> {
		return user.department?.id !== departmentId
			? this.departmentUser.createDepartmentUser({
					body: {
						departmentId,
						users: [
							{
								userId: user.id,
								assignment: DepartmentUserAssignment.Employee,
								role: DepartmentUserRole.Employee,
							},
						],
					},
			  })
			: EMPTY;
	}

	public changeOffice(user: User, officeId: string): Observable<any> {
		return user.office?.id !== officeId
			? this.officeUser.createOfficeUsers({ body: { officeId, usersIds: [user.id] } })
			: EMPTY;
	}

	public changePosition(user: User, positionId: string): Observable<any> {
		return user.position?.id !== positionId
			? this.positionUser.editPositionUser({ body: { userId: user.id, positionId } })
			: EMPTY;
	}

	public changeRole(user: User, roleId: string): Observable<any> {
		return user.role?.id !== roleId ? this.roleUser.editUserRole({ body: { userId: user.id, roleId } }) : EMPTY;
	}

	public changeRate(user: User, rate: number): Observable<any> {
		return user.company?.rate !== rate
			? this.companyUser.editCompanyUser({
					userId: user.id,
					body: [{ path: '/rate', op: 'replace', value: rate }],
			  })
			: EMPTY;
	}

	public changeStartWorkingAt(user: User, date: DateTime): Observable<any> {
		date = date.toUTC().plus({ minute: date.offset });
		const oldDate = user.company?.startWorkingAt && DateTime.fromISO(user.company.startWorkingAt, { zone: 'utc' });
		const isNewDate = !oldDate || +date.startOf('day') !== +oldDate.startOf('day');
		return isNewDate
			? this.companyUser.editCompanyUser({
					userId: user.id,
					body: [{ path: '/startworkingat', op: 'replace', value: date.toSQL() }],
			  })
			: EMPTY;
	}
}
