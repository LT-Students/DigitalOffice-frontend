import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { EditProjectComponent } from './modals/edit-project/edit-project.component';
import { ProjectsTableComponent } from './components/projects-table/projects-table.component';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { TeamStatisticsComponent } from './components/team-statistics/team-statistics.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { UserSearchComponent } from './components/new-project/modals/user-search/user-search.component';
import { DeleteDirectionComponent } from './components/new-project/modals/delete-direction/delete-direction.component';

@NgModule({
	declarations: [
		EditProjectComponent,
		ProjectsTableComponent,
		ProjectPageComponent,
		TeamStatisticsComponent,
		NewProjectComponent,
		UserSearchComponent,
		DeleteDirectionComponent,
	],
	imports: [SharedModule, ProjectsRoutingModule],
})
export class ProjectsModule {}
