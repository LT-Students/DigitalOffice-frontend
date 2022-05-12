import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppRoutes } from '@app/models/app-routes';
import { CurrentUserService } from '@app/services/current-user.service';
import { AdminRoutes } from '../../../modules/admin/models/admin-routes';

interface Link {
	label: string;
	path: string | string[];
	icon: string;
}

@Component({
	selector: 'do-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
	public AppRoutes = AppRoutes;
	public user$ = this.currentUser.user$;
	public readonly links: Link[] = [
		{
			label: 'Новости',
			path: AppRoutes.News,
			icon: 'newspaper',
		},
		{
			label: 'Учет времени',
			path: AppRoutes.TimeTrack,
			icon: 'watch_later',
		},
		{
			label: 'Доска проектов',
			path: AppRoutes.Projects,
			icon: 'desktop_mac',
		},
		{
			label: 'Сотрудники',
			path: AppRoutes.Users,
			icon: 'group',
		},
		{
			label: 'Департаменты',
			path: AppRoutes.Departments,
			icon: 'groups',
		},
		{
			label: 'Администрирование',
			path: [AppRoutes.Admin, AdminRoutes.Dashboard],
			icon: 'settings',
		},
	];

	constructor(private currentUser: CurrentUserService) {}
}
