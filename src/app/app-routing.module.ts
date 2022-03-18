import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/guards/auth.guard';
import { AdminGuard } from '@app/guards/admin.guard';
import { InstallerGuard } from '@app/guards/installer.guard';
import { ContentContainerComponent } from '@shared/component/content-container/content-container.component';
import { WizardComponent } from './modules/installer/components/wizard/wizard.component';
import { DepartmentListComponent } from './modules/admin/components/department-list/department-list.component';
import { DepartmentCardComponent } from './modules/admin/components/department-card/department-card.component';
import { DepartmentListResolver } from './modules/admin/resolvers/department-list.resolver';
import { DepartmentPageResolver } from './modules/admin/resolvers/department-page.resolver';

export const enum RouteType {
	AUTH = 'auth',
	USERS = 'users',
	ADMIN = 'admin',
	PROJECTS = 'projects',
	DEPARTMENTS = 'departments',
	NEWS = 'news',
	INSTALLER = 'installer',
	TIME_TRACK = 'time',
}

const routes: Routes = [
	{
		path: '',
		canActivate: [InstallerGuard],
		children: [
			{
				path: '',
				component: ContentContainerComponent,
				canActivate: [AuthGuard],
				children: [
					{
						path: '',
						pathMatch: 'full',
						redirectTo: RouteType.TIME_TRACK,
					},
					{
						path: RouteType.TIME_TRACK,
						loadChildren: () =>
							import('./modules/time-tracker/time-tracker.module').then((m) => m.TimeTrackerModule),
					},
					{
						path: RouteType.ADMIN,
						loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
						canActivate: [AdminGuard],
					},
					{
						path: RouteType.NEWS,
						loadChildren: () => import('./modules/news/news.module').then((m) => m.NewsModule),
					},
					{
						path: RouteType.PROJECTS,
						loadChildren: () => import('./modules/projects/projects.module').then((m) => m.ProjectsModule),
					},
					{
						path: RouteType.USERS,
						loadChildren: () => import('./modules/employee/employee.module').then((m) => m.EmployeeModule),
					},
					// {
					// 	path: RouteType.DEPARTMENTS,
					// 	loadChildren: () => import('./modules/departments/departments.module').then((m) => m.DepartmentsModule),
					// },
					{
						path: RouteType.DEPARTMENTS,
						component: DepartmentListComponent,
						resolve: {
							departments: DepartmentListResolver,
						},
					},
					{
						path: `${RouteType.DEPARTMENTS}/:id`,
						component: DepartmentCardComponent,
						resolve: {
							department: DepartmentPageResolver,
						},
					},
				],
			},
			{
				path: RouteType.AUTH,
				loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
			},
		],
	},
	{
		path: RouteType.INSTALLER,
		component: WizardComponent,
		canActivate: [InstallerGuard],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
