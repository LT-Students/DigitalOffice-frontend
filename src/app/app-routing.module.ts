import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/guards/auth.guard';
import { AdminGuard } from '@app/guards/admin.guard';
import { InstallerGuard } from '@app/guards/installer.guard';
import { ContentContainerComponent } from './shared/component/content-container/content-container.component';
import { ProjectPageComponent } from './modules/user/components/project-page/project-page.component';
import { EmployeePageComponent } from './modules/employee/employee-page.component';
import { WizardComponent } from './modules/installer/components/wizard/wizard.component';

export const enum RouteType {
  AUTH = 'auth',
  USER = 'user',
  ADMIN = 'admin',
  PROJECT = 'project',
}

const routes: Routes = [
	{
		path: '',
		canActivate: [ InstallerGuard ],
		children: [ {
			path: '',
			component: ContentContainerComponent,
			canActivate: [ AuthGuard ],
			children: [
				{
					path: '',
					pathMatch: 'full',
					redirectTo: RouteType.USER,
				},
				{
					path: RouteType.USER,
					loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
				},
				{
					path: RouteType.ADMIN,
					loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
					canActivate: [ AdminGuard ],
				},
				{
					path: `${ RouteType.USER }/:id`,
					component: EmployeePageComponent,
				},
				{
					path: RouteType.USER,
					component: EmployeePageComponent,
				},
				{
					path: `${ RouteType.PROJECT }/:id`,
					component: ProjectPageComponent,
				},
			],
		},
			{
				path: RouteType.AUTH,
				loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
			} ],
	},
	{
		path: 'installer',
		component: WizardComponent,
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
