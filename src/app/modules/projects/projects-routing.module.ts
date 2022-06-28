import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsTableComponent } from './components/projects-table/projects-table.component';
import { ProjectListResolver } from './resolvers/project-list.resolver';
import { ProjectPageContainerComponent } from './project-page/project-page-container.component';
import { ProjectPageResolver } from './resolvers/project-page.resolver';
import { ProjectsRoutes } from './models/projects-routes';
import { CreateEditProjectComponent } from './create-edit-project/create-edit-project.component';
import { TeamStatisticsComponent } from './team-statistics/team-statistics.component';
import { ProjectIdRouteContainerComponent } from './project-id-route-container/project-id-route-container.component';

const routes: Routes = [
	{
		path: '',
		component: ProjectsTableComponent,
		resolve: {
			projects: ProjectListResolver,
		},
	},
	{ path: ProjectsRoutes.CreateProject, component: CreateEditProjectComponent },
	{
		path: ':id',
		component: ProjectIdRouteContainerComponent,
		resolve: {
			project: ProjectPageResolver,
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
