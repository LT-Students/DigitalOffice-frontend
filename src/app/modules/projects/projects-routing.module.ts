import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '@app/guards/permission.guard';
import { UserRights } from '@app/types/user-rights.enum';
import { TimelistHolidaysResolver } from '../manager-timelist/resolvers/timelist-holidays-resolver.service';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { ProjectListResolver } from './resolvers/project-list.resolver';
import { ProjectPageContainerComponent } from './project-page/project-page-container.component';
import { ProjectPageResolver } from './resolvers/project-page.resolver';
import { ProjectsRoutes } from './models/projects-routes';
import { CreateEditProjectComponent } from './create-edit-project/create-edit-project.component';
import { ProjectIdRouteContainerComponent } from './project-id-route-container/project-id-route-container.component';
import { DepartmentFilterResolver } from './resolvers/department-filter.resolver';
import { ProjectUsersResolver } from './resolvers/project-users.resolver';
import { TeamStatisticsResolver } from './resolvers/team-statistics.resolver';
import { ProjectFilesResolver } from './resolvers/project-files.resolver';
import { TeamStatisticsGuard } from './guards/team-statistics.guard';
import { EditProjectGuard } from './guards/edit-project.guard';

const routes: Routes = [
	{
		path: '',
		component: ProjectsTableComponent,
		resolve: {
			projects: ProjectListResolver,
			departments: DepartmentFilterResolver,
		},
	},
	{
		path: ProjectsRoutes.CreateProject,
		component: CreateEditProjectComponent,
		canActivate: [PermissionGuard],
		data: { permission: UserRights.AddEditRemoveProjects },
	},
	{
		path: ':id',
		component: ProjectIdRouteContainerComponent,
		resolve: {
			project: ProjectPageResolver,
			users: ProjectUsersResolver,
			files: ProjectFilesResolver,
		},
		children: [
			{
				path: '',
				component: ProjectPageContainerComponent,
			},
			{
				path: ProjectsRoutes.EditProject,
				component: CreateEditProjectComponent,
				canActivate: [EditProjectGuard],
			},
			{
				path: ProjectsRoutes.TeamStats,
				loadChildren: () =>
					import('../manager-timelist/manager-timelist.module').then((m) => m.ManagerTimelistModule),
				canActivate: [TeamStatisticsGuard],
				resolve: {
					stats: TeamStatisticsResolver,
					holidays: TimelistHolidaysResolver,
				},
			},
		],
	},
	{ path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProjectsRoutingModule {}
