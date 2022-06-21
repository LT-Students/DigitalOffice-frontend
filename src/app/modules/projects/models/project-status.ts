import { ProjectStatusType } from '@api/project-service/models/project-status-type';

export interface IProjectStatus {
	type: ProjectStatusType;
	color: string;
	label: string;
}

const projectStatuses: IProjectStatus[] = [
	{ type: ProjectStatusType.Active, color: '#ABF5C0', label: 'В работе' },
	{ type: ProjectStatusType.Suspend, color: '#FFD89E', label: 'Завершен' },
	{ type: ProjectStatusType.Closed, color: '#FFB2B2', label: 'Приостановлен' },
];

export class ProjectStatus {
	public static getStatusColor(status: ProjectStatusType): string {
		return (projectStatuses.find((s: IProjectStatus) => s.type === status) as IProjectStatus).color;
	}

	public static getStatusLabel(status: ProjectStatusType): string {
		return (projectStatuses.find((s: IProjectStatus) => s.type === status) as IProjectStatus).label;
	}

	public static getAllStatuses(): IProjectStatus[] {
		return projectStatuses;
	}
}
