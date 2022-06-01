import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Link } from '@shared/component/sidebar/sidebar-types';
import { AppRoutes } from '@app/models/app-routes';
import { Icons } from '@shared/modules/icons/icons';
import { CurrentUserService } from '@app/services/current-user.service';
import { first, map } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { AdminRoutes } from '../../../modules/admin/models/admin-routes';
import { DepartmentsRoutes } from '../../../modules/departments/models/departments-routes';

@Injectable()
export class SidebarService {
	public links$: Observable<Link[]> = this.currentUser.user$.pipe(
		first(),
		map((user: User) => {
			return [
				{
					visible: () => true,
					title: 'Новости',
					path: AppRoutes.News,
					icon: Icons.News,
				},
				{
					visible: () => true,
					title: 'Учет времени',
					path: AppRoutes.TimeTrack,
					icon: Icons.TimeTrack,
				},
				{
					visible: () => true,
					title: 'Доска проектов',
					path: AppRoutes.Projects,
					icon: Icons.Projects,
				},
				{
					visible: () => true,
					title: 'Сотрудники',
					path: AppRoutes.Users,
					icon: Icons.Users,
				},
				{
					visible: () => true,
					title: 'Департаменты',
					path: AppRoutes.Departments,
					icon: Icons.Departments,
				},
				{
					visible: () => !!user?.department?.id,
					title: 'Таймлист ДД',
					path: [AppRoutes.Departments, user?.department?.id as string, DepartmentsRoutes.TimeList],
					icon: Icons.Office,
				},
				{
					visible: () => true,
					title: 'Администрирование',
					path: [AppRoutes.Admin, AdminRoutes.Dashboard],
					icon: Icons.Administration,
				},
			].filter((l: Link) => l.visible());
		})
	);

	constructor(private currentUser: CurrentUserService) {}
}
