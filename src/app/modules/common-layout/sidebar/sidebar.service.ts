import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppRoutes } from '@app/models/app-routes';
import { Icons } from '@shared/modules/icons/icons';
import { CurrentUserService } from '@app/services/current-user.service';
import { first, map } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { DepartmentUserRole } from '@api/user-service/models/department-user-role';
import { AdminRoutes } from '../../admin/models/admin-routes';
import { DepartmentsRoutes } from '../../departments/models/departments-routes';
import { Link } from './sidebar-types';

@Injectable()
export class SidebarService {
	public links$: Observable<Link[]> = this.currentUser.user$.pipe(
		first(),
		map((user: User) => {
			return [
				// {
				// 	visible: () => true,
				// 	title: 'Новости',
				// 	path: AppRoutes.News,
				// 	icon: Icons.News,
				// },
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
				// {
				// 	visible: () => true,
				// 	title: 'Департаменты',
				// 	path: AppRoutes.Departments,
				// 	icon: Icons.Departments,
				// },
				{
					visible: () => user.department?.role === DepartmentUserRole.Manager,
					title: 'Таймлист ДД',
					path: [AppRoutes.Departments, user?.department?.id as string, DepartmentsRoutes.TimeList],
					icon: Icons.Office,
				},
				{
					visible: () => user.isAdmin,
					title: 'Администрирование',
					path: [AppRoutes.Admin, AdminRoutes.Dashboard],
					icon: Icons.Administration,
				},
			].filter((l: Link) => l.visible());
		})
	);

	constructor(private currentUser: CurrentUserService) {}
}
