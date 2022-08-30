export interface IDepartmentStatus {
	value: boolean;
	label: string;
	color: string;
}

const departmentStatuses: IDepartmentStatus[] = [
	{ value: true, color: '#ABF5C0', label: 'Активный' },
	{ value: false, color: '#FFB2B2', label: 'В архиве' },
];

export class DepartmentStatus {
	public static getAllStatuses(): IDepartmentStatus[] {
		return [...departmentStatuses];
	}

	public static getStatusColorByValue(isActive: boolean): string {
		return departmentStatuses.find((status) => status.value === isActive)?.color || '';
	}
}
