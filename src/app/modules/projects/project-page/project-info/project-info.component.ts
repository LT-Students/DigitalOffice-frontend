import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { Icons } from '@shared/modules/icons/icons';
import { DateTime } from 'luxon';
import { ProjectStatusType } from '@api/project-service/models/project-status-type';
import { ProjectsRoutes } from '../../models/projects-routes';
import { ProjectStatus } from '../../models/project-status';

interface ProjectStats {
	gridArea: string;
	label: (project: ProjectInfo) => string;
	icon: Icons;
	valueGetter: (project: ProjectInfo) => string;
	style?: (project: ProjectInfo) => { [key: string]: any };
}

@Component({
	selector: 'do-project-info',
	templateUrl: './project-info.component.html',
	styleUrls: ['./project-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectInfoComponent implements OnInit {
	public readonly Icons = Icons;
	public readonly ProjectsRoutes = ProjectsRoutes;

	@Input() project!: ProjectInfo;

	public stats: ProjectStats[] = [
		{
			gridArea: 'department',
			label: () => 'Департамент',
			icon: Icons.AccountBalance,
			valueGetter: (project: ProjectInfo) => project.department?.name || '',
		},
		{
			gridArea: 'customer',
			label: () => 'Заказчик',
			icon: Icons.SupervisorAccount,
			valueGetter: (project: ProjectInfo) => project.customer || '',
		},
		{
			gridArea: 'status',
			label: () => 'Статус',
			icon: Icons.Loyalty,
			valueGetter: (project: ProjectInfo) => ProjectStatus.getStatusByType(project.status).label,
			style: (project: ProjectInfo) => ({
				padding: '1px 24px',
				color: '#fcfcfc',
				background: ProjectStatus.getStatusByType(project.status).color,
				'border-radius': '10px',
			}),
		},
		{
			gridArea: 'users',
			label: () => 'Сотрудники',
			icon: Icons.PermIdentity,
			valueGetter: (project: ProjectInfo) => `${project.usersCount} человек`,
		},
		{
			gridArea: 'start-date',
			label: () => 'Дата запуска',
			icon: Icons.Clock,
			valueGetter: (project: ProjectInfo) => this.formatDate(project.startDateUtc),
		},
		{
			gridArea: 'end-date',
			label: (project: ProjectInfo) =>
				project.status === ProjectStatusType.Suspend ? 'Дата приостановки' : 'Дата завершения',
			icon: Icons.AccessAlarm,
			valueGetter: (project: ProjectInfo) => this.formatDate(project.endDateUtc),
		},
		{
			gridArea: 'duration',
			label: () => 'Продолжительность',
			icon: Icons.History,
			valueGetter: (project: ProjectInfo) => {
				const start = DateTime.fromISO(project.startDateUtc);
				const end =
					project.endDateUtc && project.status !== ProjectStatusType.Active
						? DateTime.fromISO(project.endDateUtc)
						: DateTime.now();
				const days = end.diff(start, ['days']).toFormat('d');
				return `${days} дней`;
			},
		},
	];

	constructor() {}

	ngOnInit(): void {}

	private formatDate(date: string): string {
		return date && DateTime.fromISO(date).toFormat('dd.MM.y');
	}
}
