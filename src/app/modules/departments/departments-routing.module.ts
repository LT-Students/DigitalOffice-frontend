import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentListResolver } from './resolvers/department-list.resolver';
import { DepartmentCardComponent } from './components/department-card/department-card.component';
import { DepartmentPageResolver } from './resolvers/department-page.resolver';
import { DirectorsTimelistComponent } from './components/directors-timelist/directors-timelist.component';
import { TimelistResolver } from './resolvers/timelist.resolver';
import { DepartmentsRoutes } from './models/departments-routes';

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
		component: DepartmentCardComponent,
		resolve: {
			department: DepartmentPageResolver,
		},
		children: [
			{
				path: DepartmentsRoutes.TimeList,
				component: DirectorsTimelistComponent,
				resolve: {
					timelist: TimelistResolver,
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
