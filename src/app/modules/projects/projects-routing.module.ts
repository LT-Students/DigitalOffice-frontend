import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsTableComponent } from './components/projects-table/projects-table.component';
import { ProjectListResolver } from './resolvers/project-list.resolver';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { ProjectPageResolver } from './resolvers/project-page.resolver';
import { ProjectsRoutes } from './models/projects-routes';
import { CreateEditProjectComponent } from './create-edit-project/create-edit-project.component';

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
