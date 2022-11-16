import { UserInfo } from '@api/department-service/models/user-info';
import { DepartmentRole, DepartmentRoleInfo } from './department-role-info';

export class DepartmentUser {
	public id: string;
	public imageId?: string;
	public firstName: string;
	public lastName: string;
	public middleName?: string;
	public position?: { name: string };
	public role: DepartmentRole;

	constructor(user: UserInfo) {
		this.id = user.id;
		this.imageId = user.imageId;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.middleName = user.middleName;
		this.position = user.position;
		this.role = user.departmentUser ? new DepartmentRoleInfo(user.departmentUser).role : DepartmentRole.Employee;
	}
}
