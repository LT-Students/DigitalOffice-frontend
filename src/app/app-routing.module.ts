import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/guards/auth.guard';
import { AdminGuard } from '@app/guards/admin.guard';
import { InstallerGuard } from '@app/guards/installer.guard';
import { ContentContainerComponent } from '@shared/component/content-container/content-container.component';
import { AppRoutes } from '@app/models/app-routes';

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
						redirectTo: AppRoutes.TimeTrack,
					},
					{
						path: AppRoutes.TimeTrack,
						loadChildren: () =>
							import('./modules/time-tracker/time-tracker.module').then((m) => m.TimeTrackerModule),
					},
					{
						path: AppRoutes.Admin,
						loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
						canActivate: [AdminGuard],
					},
					{
						path: AppRoutes.News,
						loadChildren: () => import('./modules/news/news.module').then((m) => m.NewsModule),
					},
					{
						path: AppRoutes.Projects,
						loadChildren: () => import('./modules/projects/projects.module').then((m) => m.ProjectsModule),
					},
					{
						path: AppRoutes.Users,
						loadChildren: () => import('./modules/employee/employee.module').then((m) => m.EmployeeModule),
					},
					{
						path: AppRoutes.Departments,
						loadChildren: () =>
							import('./modules/departments/departments.module').then((m) => m.DepartmentsModule),
					},
				],
			},
			{
				path: AppRoutes.Auth,
				loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
			},
		],
	},
	{
		path: AppRoutes.Installer,
		loadChildren: () => import('./modules/installer/installer.module').then((m) => m.InstallerModule),
		canActivate: [InstallerGuard],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
