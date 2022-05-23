import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppRoutes } from '@app/models/app-routes';
import { Link } from '@shared/component/sidebar/sidebar-types';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AdminRoutes } from '../../../modules/admin/models/admin-routes';

@Component({
	selector: 'do-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
	public readonly links: Link[] = [
		{
			title: 'Новости',
			path: AppRoutes.News,
			icon: 'newspaper',
		},
		{
			title: 'Учет времени',
			path: AppRoutes.TimeTrack,
			icon: 'watch_later',
		},
		{
			title: 'Доска проектов',
			path: AppRoutes.Projects,
			icon: 'desktop_mac',
		},
		{
			title: 'Сотрудники',
			path: AppRoutes.Users,
			icon: 'group',
		},
		{
			title: 'Департаменты',
			path: AppRoutes.Departments,
			icon: 'groups',
		},
		{
			title: 'Администрирование',
			path: [AppRoutes.Admin, AdminRoutes.Dashboard],
			icon: 'settings',
		},
	];
	public isWideScreen$ = this.breakpoint
		.observe(Breakpoints.XLarge)
		.pipe(map((state: BreakpointState) => state.matches));

	constructor(private breakpoint: BreakpointObserver) {}
}
