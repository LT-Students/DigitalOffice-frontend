import { Injectable } from '@angular/core';
import { OfficeApiService } from '@api/office-service/services/office-api.service';
import { OfficeUsersApiService } from '@api/office-service/services/office-users-api.service';
import { PositionUserApiService } from '@api/position-service/services/position-user-api.service';
import { PositionApiService } from '@api/position-service/services/position-api.service';
import { UserRoleApiService } from '@api/rights-service/services/user-role-api.service';
import { RoleApiService } from '@api/rights-service/services/role-api.service';
import { CompanyUserApiService } from '@api/company-service/services/company-user-api.service';
import { EMPTY, Observable } from 'rxjs';
import { DateTime } from 'luxon';
import { User } from '@app/models/user/user.model';
import { UserService } from '@app/services/user/user.service';
import { UserPath } from '@app/types/edit-request';
import { ContractSubjectApiService } from '@api/company-service/services/contract-subject-api.service';

@Injectable({
	providedIn: 'root',
})
export class EditUserService {
	constructor(
		private officeUser: OfficeUsersApiService,
		private office: OfficeApiService,
		private positionUser: PositionUserApiService,
		private position: PositionApiService,
		private roleUser: UserRoleApiService,
		private role: RoleApiService,
		private companyUser: CompanyUserApiService,
		private contractService: ContractSubjectApiService,
		private userService: UserService
	) {}

	/**
	 * Submit methods
	 */
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

	public changeContract(user: User, contractId: string): Observable<any> {
		return user.company?.contractSubject?.id !== contractId
			? this.companyUser.editCompanyUser({
					userId: user.id,
					body: [{ path: '/contractsubjectid', op: 'replace', value: contractId }],
			  })
			: EMPTY;
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

	public changeAdminStatus(userId: string, isAdmin: boolean): Observable<any> {
		return this.userService.editUser(userId, [{ path: UserPath.IS_ADMIN, op: 'replace', value: isAdmin }]);
	}
}
