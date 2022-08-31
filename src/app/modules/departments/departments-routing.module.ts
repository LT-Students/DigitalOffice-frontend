import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListResolver } from './resolvers/department-list.resolver';
import { DepartmentPageComponent } from './department-page/department-page.component';
import { DepartmentPageResolver } from './resolvers/department-page.resolver';
import { TimelistResolver } from './resolvers/timelist.resolver';
import { DepartmentsRoutes } from './models/departments-routes';
import { DepartmentIdRouteContainerComponent } from './department-id-route-container/department-id-route-container.component';
import { DepartmentListComponent } from './department-list/department-list.component';

const routes: Routes = [
	{
		path: '',
		component: DepartmentListComponent,
		resolve: {
			departments: DepartmentListResolver,
		},
	},
	{
		path: ':id',
		component: DepartmentIdRouteContainerComponent,
		resolve: {
			department: DepartmentPageResolver,
		},
		children: [
			{
				path: '',
				component: DepartmentPageComponent,
			},
			{
				path: DepartmentsRoutes.TimeList,
				loadChildren: () =>
					import('../manager-timelist/manager-timelist.module').then((m) => m.ManagerTimelistModule),
				resolve: {
					stats: TimelistResolver,
				},
			},
		],
	},
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DepartmentsRoutingModule {}
