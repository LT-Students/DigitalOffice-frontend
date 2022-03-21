import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsTableComponent } from './components/projects-table/projects-table.component';
import { ProjectListResolver } from './resolvers/project-list.resolver';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { ProjectPageResolver } from './resolvers/project-page.resolver';
import { ProjectsRoutes } from './models/projects-routes';

const routes: Routes = [
	{
		path: '',
		component: ProjectsTableComponent,
		resolve: {
			projects: ProjectListResolver,
		},
	},
	{ path: ProjectsRoutes.NewProject, component: NewProjectComponent },
	{
		path: ':id',
		component: ProjectPageComponent,
		resolve: {
			project: ProjectPageResolver,
		},
	},
	{ path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProjectsRoutingModule {}
