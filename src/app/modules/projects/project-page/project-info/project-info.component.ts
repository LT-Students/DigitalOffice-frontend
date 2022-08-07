import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { Icons } from '@shared/modules/icons/icons';
import { DateTime } from 'luxon';
import { ProjectStatusType } from '@api/project-service/models/project-status-type';
import { I18nPluralPipe } from '@angular/common';
import { CurrentUserService } from '@app/services/current-user.service';
import { combineLatest, Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { ProjectUserInfo } from '@api/project-service/models/project-user-info';
import { ProjectUserRoleType } from '@api/project-service/models/project-user-role-type';
import { PermissionService } from '@app/services/permission.service';
import { UserRights } from '@app/types/user-rights.enum';
import { ProjectsRoutes } from '../../models/projects-routes';
import { SelectedProjectService } from '../../project-id-route-container/selected-project.service';
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
	providers: [I18nPluralPipe],
})
export class ProjectInfoComponent implements OnInit {
	public readonly Icons = Icons;
	public readonly ProjectsRoutes = ProjectsRoutes;

	@Input() project!: ProjectInfo;

	public canAccessTeamStatistics$ = this.canAccessTeamStatistics();
	public canEditProject$ = this.canEditProject();

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
			valueGetter: (project: ProjectInfo) =>
				this.pluralPipe.transform(project.usersCount, {
					few: '# человека',
					other: '# человек',
				}),
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
				return this.pluralPipe.transform(+days, { one: '# день', few: '# дня', other: '# дней' });
			},
		},
	];

	constructor(
		private pluralPipe: I18nPluralPipe,
		private selectedProject: SelectedProjectService,
		private currentUser: CurrentUserService,
		private permission: PermissionService
	) {}

	ngOnInit(): void {}

	private formatDate(date: string): string {
		return date && DateTime.fromISO(date).toFormat('dd.MM.y');
	}

	private canAccessTeamStatistics(): Observable<boolean> {
		return combineLatest([this.currentUser.user$, this.selectedProject.info$]).pipe(
			map(([user, project]: [User, ProjectResponse]) => {
				if (user.isAdmin) {
					return true;
				} else {
					const projectUsers = project.users;
					const currUser = projectUsers?.find((u: ProjectUserInfo) => u.userId === user.id);
					return !!currUser && currUser.role === ProjectUserRoleType.Manager;
				}
			})
		);
	}

	private canEditProject(): Observable<boolean> {
		return this.permission.checkPermission$(UserRights.AddEditRemoveProjects).pipe(
			first(),
			switchMap((hasPermission: boolean) => {
				if (hasPermission) {
					return of(true);
				} else {
					return combineLatest([this.currentUser.user$, this.selectedProject.info$]).pipe(
						map(([user, project]: [User, ProjectResponse]) => {
							const projectUsers = project.users;
							const currUser = projectUsers?.find((u: ProjectUserInfo) => u.userId === user.id);
							return !!currUser && currUser.role === ProjectUserRoleType.Manager;
						})
					);
				}
			})
		);
	}
}
