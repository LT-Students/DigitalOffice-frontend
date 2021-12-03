import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/guards/auth.guard';
import { AdminGuard } from '@app/guards/admin.guard';
import { InstallerGuard } from '@app/guards/installer.guard';
import { EmployeePageService } from '@app/services/employee-page.service';
import { ContentContainerComponent } from './shared/component/content-container/content-container.component';
import { ProjectPageComponent } from './modules/user/components/project-page/project-page.component';
import { EmployeePageComponent } from './modules/employee/employee-page.component';
import { WizardComponent } from './modules/installer/components/wizard/wizard.component';
import { DepartmentListComponent } from './modules/admin/components/department-list/department-list.component';
import { DepartmentCardComponent } from './modules/admin/components/department-card/department-card.component';
import { DepartmentListResolver } from './modules/admin/resolvers/department-list.resolver';
import { DepartmentPageResolver } from './modules/admin/resolvers/department-page.resolver';
import { ProjectPageResolver } from './modules/user/resolvers/project-page.resolver';

export const enum RouteType {
	AUTH = 'auth',
	USER = 'user',
	ADMIN = 'admin',
	PROJECT = 'project',
	DEPARTMENTS = 'departments',
	NEWS = 'news',
	INSTALLER = 'installer',
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
						redirectTo: RouteType.USER,
					},
					{
						path: RouteType.USER,
						loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule),
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
						path: `${RouteType.USER}/:id`,
						component: EmployeePageComponent,
						resolve: {
							employee: EmployeePageService,
						},
					},
					{
						path: `${RouteType.PROJECT}/:id`,
						component: ProjectPageComponent,
						resolve: {
							project: ProjectPageResolver,
						},
					},
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
