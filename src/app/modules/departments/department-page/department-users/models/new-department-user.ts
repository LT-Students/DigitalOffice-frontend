import { UserInfo } from '@api/filter-service/models/user-info';
import { DepartmentUserInfo } from '@api/department-service/models/department-user-info';
import { ExistingUserBase, NewUserBase } from '../../../../add-users-dialog/models';
import { DepartmentRole, DepartmentRoleInfo } from './department-role-info';

export interface NewDepartmentUser extends NewUserBase {
	role: DepartmentRole;
}
export class NewDepartmentUser {
	constructor(apiUser: UserInfo) {
		this.id = apiUser.id;
		this.firstName = apiUser.firstName;
		this.lastName = apiUser.lastName;
		this.middleName = apiUser.middleName;
		this.imageId = apiUser.avatarId;
		this.role = DepartmentRole.Employee;
	}
}

export interface ExistingDepartmentUser extends ExistingUserBase {
	role: DepartmentRole;
}
export class ExistingDepartmentUser {
	constructor(departmentUser: DepartmentUserInfo) {
		this.id = departmentUser.userId;
		this.role = new DepartmentRoleInfo(departmentUser).role;
	}
}
