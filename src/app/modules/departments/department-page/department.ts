import { DepartmentResponse } from '@api/department-service/models/department-response';
import { DepartmentStatus, IDepartmentStatus } from '../models/department-status';
import { ExistingDepartmentUser } from './department-users/models/new-department-user';

export class Department {
	public id: string;
	public name: string;
	public shortName: string;
	public isActive: boolean;
	public status: IDepartmentStatus;
	public description: string;
	public users: ExistingDepartmentUser[];

	constructor(res: DepartmentResponse) {
		this.id = res.id;
		this.name = res.name;
		this.shortName = res.shortName;
		this.isActive = res.isActive;
		this.status = DepartmentStatus.getStatusByValue(res.isActive);
		this.description = res.description || '';
		this.users = (res.users || []).map((u) => new ExistingDepartmentUser(u));
	}
}
