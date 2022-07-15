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
import { OfficeInfo } from '@api/office-service/models/office-info';
import { PositionInfo } from '@api/position-service/models/position-info';
import { RoleInfo } from '@api/rights-service/models/role-info';
import { UserService } from '@app/services/user/user.service';
import { UserPath } from '@app/types/edit-request';
import { ContractSubjectInfo } from '@api/company-service/models/contract-subject-info';
import { ContractSubjectApiService } from '@api/company-service/services/contract-subject-api.service';
import { map } from 'rxjs/operators';

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
	 * find methods
	 */

	public findOffices(params: FindParams) {
		return this.office.findOffices(params);
	}

	public findPositions(params: FindParams) {
		return this.position.findPositions(params);
	}

	public findRoles(params: FindParams) {
		return this.role.findRoles({ ...params, locale: 'ru' });
	}

	public findContracts(params: FindParams) {
		return this.contractService.findContractSubjects({ ...params }).pipe(map((res) => res.body ?? []));
	}

	/**
	 * Submit methods
	 */
	public changeOffice(user: User, office: OfficeInfo): Observable<any> {
		return user.office?.id !== office.id
			? this.officeUser.createOfficeUsers({ body: { officeId: office.id, usersIds: [user.id] } })
			: EMPTY;
	}

	public changePosition(user: User, position: PositionInfo): Observable<any> {
		return user.position?.id !== position.id
			? this.positionUser.editPositionUser({ body: { userId: user.id, positionId: position.id } })
			: EMPTY;
	}

	public changeRole(user: User, role: RoleInfo): Observable<any> {
		return user.role?.id !== role.id
			? this.roleUser.editUserRole({ body: { userId: user.id, roleId: role.id } })
			: EMPTY;
	}

	public changeContract(user: User, contract: ContractSubjectInfo): Observable<any> {
		return user.company?.contractSubject?.id !== contract.id
			? this.companyUser.editCompanyUser({
					userId: user.id,
					body: [{ path: '/contractsubjectid', op: 'replace', value: contract.id }],
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
