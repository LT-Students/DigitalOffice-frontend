import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { Icons } from '@shared/features/icons/icons';
import { DateTime } from 'luxon';
import { ProjectStatusType } from '@api/project-service/models/project-status-type';
import { ProjectsRoutes } from '../../models/projects-routes';

interface ProjectStats {
	label: (project: ProjectInfo) => string;
	valueGetter: (project: ProjectInfo) => string;
	visible?: (project: ProjectInfo) => boolean;
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
			label: () => 'Дата запуска',
			valueGetter: (project: ProjectInfo) => this.formatDate(project.startDateUtc),
		},
		{
			label: () => 'Продолжительность',
			valueGetter: (project: ProjectInfo) => {
				const start = DateTime.fromISO(project.startDateUtc);
				const end =
					project.endDateUtc && project.status !== ProjectStatusType.Active
						? DateTime.fromISO(project.endDateUtc)
						: DateTime.now();
				const days = end.diff(start, ['days']).toFormat('d');
				return `${days} д`;
			},
		},
		{
			visible: (project: ProjectInfo) => !!project.endDateUtc,
			label: (project: ProjectInfo) =>
				project.status === ProjectStatusType.Suspend ? 'Приостановлен' : 'Дата завершения',
			valueGetter: (project: ProjectInfo) => this.formatDate(project.endDateUtc),
		},
		{
			label: () => 'Количество сотрудников',
			valueGetter: (project: ProjectInfo) => `${project.usersCount} чел`,
		},
	];

	constructor() {}

	ngOnInit(): void {}

	private formatDate(date: string): string {
		return DateTime.fromISO(date).toFormat('dd/MM/y');
	}
}
