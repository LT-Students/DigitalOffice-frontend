import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '@app/guards/permission.guard';
import { UserRights } from '@app/types/user-rights.enum';
import { DepartmentListResolver } from './resolvers/department-list.resolver';
import { DepartmentPageComponent } from './department-page/department-page.component';
import { DepartmentPageResolver } from './resolvers/department-page.resolver';
import { TimelistResolver } from './resolvers/timelist.resolver';
import { DepartmentsRoutes } from './models/departments-routes';
import { DepartmentIdRouteContainerComponent } from './department-id-route-container/department-id-route-container.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';

const routes: Routes = [
	{
		path: '',
		component: DepartmentListComponent,
		resolve: {
			departments: DepartmentListResolver,
		},
	},
	{
		path: DepartmentsRoutes.CreateDepartment,
		component: CreateDepartmentComponent,
		canActivate: [PermissionGuard],
		data: { permission: UserRights.AddEditRemoveDepartment },
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
				path: DepartmentsRoutes.EditDepartment,
				component: EditDepartmentComponent,
				canActivate: [],
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
