import { ProjectUserRoleType, ProjectUserInfo } from '@api/project-service/models';
import { UserInfo } from '@api/filter-service/models';
import { ExistingUserBase, NewUserBase } from '../../../add-users-dialog/models';

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
		this.imageId = apiUser.avatarId;
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
