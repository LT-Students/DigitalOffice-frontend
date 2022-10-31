import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/guards/auth.guard';
import { AdminGuard } from '@app/guards/admin.guard';
import { InstallerGuard } from '@app/guards/installer.guard';
import { AppRoutes } from '@app/models/app-routes';
import { IsLoggedGuard } from '@app/guards/is-logged.guard';
import { PortalGuard } from '@app/guards/portal.guard';
import { ContentContainerComponent } from './modules/common-layout/content-container/content-container.component';

const routes: Routes = [
	{
		path: AppRoutes.Installer,
		loadChildren: () => import('./modules/installer/installer.module').then((m) => m.InstallerModule),
		canLoad: [InstallerGuard],
		canActivate: [InstallerGuard],
	},
	{
		path: AppRoutes.Auth,
		loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
		canLoad: [IsLoggedGuard, PortalGuard],
		canActivate: [IsLoggedGuard, PortalGuard],
	},
	{
		path: '',
		component: ContentContainerComponent,
		canActivate: [AuthGuard, PortalGuard],
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: AppRoutes.TimeTrack,
			},
			{
				path: AppRoutes.TimeTrack,
				canLoad: [AuthGuard, PortalGuard],
				loadChildren: () =>
					import('./modules/time-tracker/time-tracker.module').then((m) => m.TimeTrackerModule),
			},
			{
				path: AppRoutes.Admin,
				canLoad: [AuthGuard, PortalGuard],
				canActivate: [AdminGuard],
				loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
			},
			// {
			// 	path: AppRoutes.News,
			// 	canLoad: [AuthGuard, PortalGuard],
			// 	loadChildren: () => import('./modules/news/news.module').then((m) => m.NewsModule),
			// },
			{
				path: AppRoutes.Projects,
				canLoad: [AuthGuard, PortalGuard],
				loadChildren: () => import('./modules/projects/projects.module').then((m) => m.ProjectsModule),
			},
			{
				path: AppRoutes.Users,
				canLoad: [AuthGuard, PortalGuard],
				loadChildren: () => import('./modules/employee/employee.module').then((m) => m.EmployeeModule),
			},
			{
				path: AppRoutes.Departments,
				canLoad: [AuthGuard, PortalGuard],
				loadChildren: () => import('./modules/departments/departments.module').then((m) => m.DepartmentsModule),
			},
			{
				path: AppRoutes.Feedback,
				canLoad: [AuthGuard, PortalGuard],
				loadChildren: () => import('./modules/feedback/feedback.module').then((m) => m.FeedbackModule),
			},
			{
				path: AppRoutes.Wiki,
				canLoad: [AuthGuard, PortalGuard],
				loadChildren: () => import('./modules/wiki/wiki.module').then((m) => m.WikiModule),
			},
		],
	},
	{
		path: '**',
		redirectTo: '',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
