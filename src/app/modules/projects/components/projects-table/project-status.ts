import { ProjectStatusType } from '@api/project-service/models/project-status-type';

export interface IProjectStatus {
	status: ProjectStatusType;
	color: string;
	label: string;
}

const projectStatuses: IProjectStatus[] = [
	{ status: ProjectStatusType.Active, color: '#ABF5C0', label: 'В работе' },
	{ status: ProjectStatusType.Suspend, color: '#FFD89E', label: 'Завершен' },
	{ status: ProjectStatusType.Closed, color: '#FFB2B2', label: 'Приостановлен' },
];

export class ProjectStatus {
	public static getStatusColor(status: ProjectStatusType): string {
		return (projectStatuses.find((s: IProjectStatus) => s.status === status) as IProjectStatus).color;
	}

	public static getStatusLabel(status: ProjectStatusType): string {
		return (projectStatuses.find((s: IProjectStatus) => s.status === status) as IProjectStatus).label;
	}

	public static getAllStatuses(): IProjectStatus[] {
		return projectStatuses;
	}
}
