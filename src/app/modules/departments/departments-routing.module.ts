import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { PermissionGuard } from '@app/guards/permission.guard';
import { UserRights } from '@app/types/user-rights.enum';
import { TimelistHolidaysResolver } from '../manager-timelist/resolvers/timelist-holidays-resolver.service';
import { AutocompleteFilterParams, FilterDef } from '../dynamic-filter/models';
import { AdditionalTimelistFilters, UserStat } from '../manager-timelist/models';
import { FilterEvent } from '../dynamic-filter/dynamic-filter.component';
import { DepartmentListResolver } from './resolvers/department-list.resolver';
import { DepartmentPageComponent } from './department-page/department-page.component';
import { DepartmentPageResolver } from './resolvers/department-page.resolver';
import { TimelistResolver } from './resolvers/timelist.resolver';
import { DepartmentsRoutes } from './models/departments-routes';
import { DepartmentIdRouteContainerComponent } from './department-id-route-container/department-id-route-container.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { EditDepartmentGuard } from './guards/edit-department.guard';
import { TimeListGuard } from './guards/time-list.guard';
import { DepartmentUsersResolver } from './department-page/department-users/department-users.resolver';
import { DepartmentProjectsResolver } from './department-page/department-projects/department-projects.resolver';
import { DepartmentUsersComponent } from './department-page/department-users/department-users.component';
import { DepartmentProjectsComponent } from './department-page/department-projects/department-projects.component';
import { DepartmentOverviewComponent } from './department-page/department-overview/department-overview.component';
import { DepartmentPageStateService } from './department-id-route-container/department-page-state.service';

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
				children: [
					{
						path: '',
						redirectTo: DepartmentsRoutes.Users,
						pathMatch: 'full',
					},
					{
						path: DepartmentsRoutes.Users,
						component: DepartmentUsersComponent,
						resolve: {
							users: DepartmentUsersResolver,
						},
					},
					{
						path: DepartmentsRoutes.Projects,
						component: DepartmentProjectsComponent,
						resolve: {
							projects: DepartmentProjectsResolver,
						},
					},
					{
						path: DepartmentsRoutes.Overview,
						component: DepartmentOverviewComponent,
					},
				],
			},
			{
				path: DepartmentsRoutes.EditDepartment,
				component: EditDepartmentComponent,
				canActivate: [EditDepartmentGuard],
			},
			{
				path: DepartmentsRoutes.TimeList,
				loadChildren: () =>
					import('../manager-timelist/manager-timelist.module').then((m) => m.ManagerTimelistModule),
				canActivate: [TimeListGuard],
				resolve: {
					stats: TimelistResolver,
					holidays: TimelistHolidaysResolver,
					projects: DepartmentProjectsResolver,
				},
				providers: [
					{
						provide: AdditionalTimelistFilters,
						useFactory: resolveAdditionalFilters,
						deps: [DepartmentPageStateService],
					},
				],
			},
		],
	},
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

function resolveAdditionalFilters(depState: DepartmentPageStateService): AdditionalTimelistFilters {
	return {
		getAdditionalFilters(): Observable<FilterDef[]> {
			return of([
				{
					key: 'projectId',
					type: 'autocomplete',
					width: 306,
					params: new AutocompleteFilterParams({
						options$: depState.projects$.pipe(map((projects) => projects.data)),
						valueGetter: (p) => p?.id,
						displayWithFn: (p) => p?.name || '',
						filterFn: (v: string, options: ProjectInfo[]) => {
							v = v.toLowerCase();
							return options.filter((p: ProjectInfo) => p.name.toLowerCase().includes(v));
						},
						placeholder: 'Выберите проект',
					}),
				},
			]);
		},
		filterFn(stats: UserStat[], filter: FilterEvent): UserStat[] {
			const projectId = filter['projectId'];
			return projectId ? stats.filter((u) => u.workTimes.some((wt) => wt.project?.id === projectId)) : stats;
		},
	};
}

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DepartmentsRoutingModule {}
