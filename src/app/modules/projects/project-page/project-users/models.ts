import { ProjectUserRoleType, ProjectUserInfo } from '@api/project-service/models';
import { UserInfo } from '@api/filter-service/models/user-info';
import { ExistingUserBase, NewUserBase } from '../../../add-users-dialog/models/models';

export interface NewProjectUser extends NewUserBase {
	department?: string;
	role: ProjectUserRoleType;
}
export class NewProjectUser {
	constructor(apiUser: UserInfo) {
		this.id = apiUser.id;
		this.firstName = apiUser.firstName;
		this.lastName = apiUser.lastName;
		this.middleName = apiUser.middleName;
		this.avatar = apiUser.avatar;
		this.department = apiUser.department?.name;
		this.role = ProjectUserRoleType.Employee;
	}
}

export interface ExistingProjectUser extends ExistingUserBase {
	role: ProjectUserRoleType;
}
export class ExistingProjectUser {
	constructor(projectUser: ProjectUserInfo) {
		this.id = projectUser.userId;
		this.role = projectUser.role;
	}
}
