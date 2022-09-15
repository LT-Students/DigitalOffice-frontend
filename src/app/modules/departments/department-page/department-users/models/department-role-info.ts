import { DepartmentUserAssignment, DepartmentUserRole } from '@api/department-service/models';
import { Icons } from '@shared/modules/icons/icons';

export enum DepartmentRole {
	Employee,
	Manager,
	Director,
}

interface UserRole {
	role: DepartmentUserRole;
	assignment: DepartmentUserAssignment;
}

export class DepartmentRoleInfo {
	private static roles = [
		new DepartmentRoleInfo({ assignment: DepartmentUserAssignment.Director, role: DepartmentUserRole.Manager }),
		new DepartmentRoleInfo({ assignment: DepartmentUserAssignment.Employee, role: DepartmentUserRole.Manager }),
		new DepartmentRoleInfo({
			assignment: DepartmentUserAssignment.Employee,
			role: DepartmentUserRole.Employee,
		}),
	];

	public role: DepartmentRole;
	public label: string;
	public icon: Icons | null;

	constructor(userRole: UserRole) {
		const [role, label, icon] = this.getRole(userRole);
		this.role = role;
		this.label = label;
		this.icon = icon;
	}

	public static getAllRoles(): DepartmentRole[] {
		return this.roles.map((r: DepartmentRoleInfo) => r.role);
	}

	public static getRoleInfoByRole(role: DepartmentRole): DepartmentRoleInfo {
		return this.roles.find((r: DepartmentRoleInfo) => r.role === role) || this.roles[0];
	}

	public static getRoleAndAssignment(role: DepartmentRole): UserRole {
		switch (role) {
			case DepartmentRole.Director:
				return { assignment: DepartmentUserAssignment.Director, role: DepartmentUserRole.Manager };
			case DepartmentRole.Manager:
				return { assignment: DepartmentUserAssignment.Employee, role: DepartmentUserRole.Manager };
			default:
				return {
					assignment: DepartmentUserAssignment.Employee,
					role: DepartmentUserRole.Employee,
				};
		}
	}

	private getRole({ assignment, role }: UserRole): [DepartmentRole, string, Icons | null] {
		if (assignment === DepartmentUserAssignment.Director) {
			return [DepartmentRole.Director, 'Директор департамента', Icons.StarFill];
		}
		if (role === DepartmentUserRole.Manager) {
			return [DepartmentRole.Manager, 'Менеджер департамента', Icons.StarBorder];
		}
		return [DepartmentRole.Employee, 'Сотрудник департамента', null];
	}
}
