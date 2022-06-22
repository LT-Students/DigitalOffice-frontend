import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { Icons } from '@shared/features/icons/icons';
import { DatePipe } from '@angular/common';
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
	providers: [DatePipe],
})
export class ProjectInfoComponent implements OnInit {
	public readonly Icons = Icons;
	public readonly ProjectsRoutes = ProjectsRoutes;

	@Input() project!: ProjectInfo;

	public stats: ProjectStats[] = [
		{
			label: () => 'Дата запуска',
			valueGetter: (project: ProjectInfo) =>
				this.datePipe.transform(project.startDateUtc, 'dd/MM/y HH:mm') as string,
		},
		{
			label: () => 'Продолжительность',
			valueGetter: (project: ProjectInfo) => {
				const start = DateTime.fromISO(project.startDateUtc);
				const end = project.endDateUtc ? DateTime.fromISO(project.endDateUtc) : DateTime.now();
				const days = end.diff(start, ['days']).toFormat('d');
				return `${days} д`;
			},
		},
		{
			visible: (project: ProjectInfo) => project.status !== ProjectStatusType.Active,
			label: (project: ProjectInfo) =>
				project.status === ProjectStatusType.Closed ? 'Дата завершения' : 'Приостановлен',
			valueGetter: (project: ProjectInfo) =>
				this.datePipe.transform(project.endDateUtc, 'dd/MM/y HH:mm') as string,
		},
		{
			label: () => 'Количество сотрудников',
			valueGetter: (project: ProjectInfo) => `${project.usersCount} чел`,
		},
	];

	constructor(private datePipe: DatePipe) {}

	ngOnInit(): void {}
}
