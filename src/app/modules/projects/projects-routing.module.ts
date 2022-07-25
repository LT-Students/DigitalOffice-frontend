import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { ProjectListResolver } from './resolvers/project-list.resolver';
import { ProjectPageContainerComponent } from './project-page/project-page-container.component';
import { ProjectPageResolver } from './resolvers/project-page.resolver';
import { ProjectsRoutes } from './models/projects-routes';
import { CreateEditProjectComponent } from './create-edit-project/create-edit-project.component';
import { TeamStatisticsComponent } from './team-statistics/team-statistics.component';
import { ProjectIdRouteContainerComponent } from './project-id-route-container/project-id-route-container.component';
import { DepartmentFilterResolver } from './resolvers/department-filter.resolver';
import { ProjectUsersResolver } from './resolvers/project-users.resolver';

const routes: Routes = [
	{
		path: '',
		component: ProjectsTableComponent,
		resolve: {
			projects: ProjectListResolver,
			departments: DepartmentFilterResolver,
		},
	},
	{ path: ProjectsRoutes.CreateProject, component: CreateEditProjectComponent },
	{
		path: ':id',
		component: ProjectIdRouteContainerComponent,
		resolve: {
			project: ProjectPageResolver,
			users: ProjectUsersResolver,
		},
		children: [
			{
				path: '',
				component: ProjectPageContainerComponent,
			},
			{
				path: ProjectsRoutes.EditProject,
				component: CreateEditProjectComponent,
			},
			{
				path: ProjectsRoutes.TeamStats,
				component: TeamStatisticsComponent,
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
