import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppRoutes } from '@app/models/app-routes';
import { Link } from '@shared/component/sidebar/sidebar-types';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Icons } from '@shared/modules/icons/icons';
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
			icon: Icons.News,
		},
		{
			title: 'Учет времени',
			path: AppRoutes.TimeTrack,
			icon: Icons.TimeTrack,
		},
		{
			title: 'Доска проектов',
			path: AppRoutes.Projects,
			icon: Icons.Projects,
		},
		{
			title: 'Сотрудники',
			path: AppRoutes.Users,
			icon: Icons.Users,
		},
		{
			title: 'Департаменты',
			path: AppRoutes.Departments,
			icon: Icons.Departments,
		},
		{
			title: 'Администрирование',
			path: [AppRoutes.Admin, AdminRoutes.Dashboard],
			icon: Icons.Administration,
		},
	];
	public isWideScreen$ = this.breakpoint
		.observe(Breakpoints.XLarge)
		.pipe(map((state: BreakpointState) => state.matches));

	constructor(private breakpoint: BreakpointObserver) {}
}
