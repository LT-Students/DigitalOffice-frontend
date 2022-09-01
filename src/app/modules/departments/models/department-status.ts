export enum DepartmentUrlStatus {
	Active = 'active',
	Archived = 'archived',
}

export interface IDepartmentStatus {
	value: boolean;
	urlValue: DepartmentUrlStatus;
	label: string;
	color: string;
}

const departmentStatuses: IDepartmentStatus[] = [
	{ value: true, urlValue: DepartmentUrlStatus.Active, color: '#ABF5C0', label: 'Активный' },
	{ value: false, urlValue: DepartmentUrlStatus.Archived, color: '#FFB2B2', label: 'В архиве' },
];

export class DepartmentStatus {
	public static getAllStatuses(): IDepartmentStatus[] {
		return [...departmentStatuses];
	}

	public static getStatusColorByValue(isActive: boolean): string {
		return departmentStatuses.find((status) => status.value === isActive)?.color || '';
	}

	public static getStatusByValue(v: boolean): IDepartmentStatus {
		return departmentStatuses.find((status) => status.value === v) || departmentStatuses[0];
	}
}
