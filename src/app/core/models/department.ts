//@ts-nocheck
import { DepartmentInfo } from '@api/company-service/models/department-info';
import { UserInfo } from '@api/company-service/models/user-info';
import { setProperty } from '@app/utils/utils';

export class Department implements DepartmentInfo {
	public countUsers: number;
	public description: string;
	public director: UserInfo;
	public id: string;
	public name: string;

	constructor(data: DepartmentInfo) {
		this.countUsers = setProperty(data.countUsers);
		this.description = setProperty(data.description);
		this.director = setProperty(data.director);
		this.id = setProperty(data.id);
		this.name = setProperty(data.name);
	}

	/* methods */
}
