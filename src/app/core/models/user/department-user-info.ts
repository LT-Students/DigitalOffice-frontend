import { DepartmentUserInfo } from '@api/user-service/models/department-user-info';
import { DepartmentUserRole } from '@api/user-service/models/department-user-role';

export class DepartmentInfo {
	public id: string;
	public name: string;
	public shortName: string;
	public role: DepartmentUserRole;

	constructor(data: DepartmentUserInfo) {
		this.id = data.department.id;
		this.name = data.department.name;
		this.shortName = data.department.shortName;
		this.role = data.role;
	}
}
