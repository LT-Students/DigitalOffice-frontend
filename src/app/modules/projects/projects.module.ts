import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '../table/table.module';
import { DynamicFilterModule } from '../dynamic-filter/dynamic-filter.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsTableComponent } from './components/projects-table/projects-table.component';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { TeamStatisticsComponent } from './components/team-statistics/team-statistics.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { DeleteDirectionComponent } from './components/new-project/modals/delete-direction/delete-direction.component';

@NgModule({
	declarations: [
		ProjectsTableComponent,
		ProjectPageComponent,
		TeamStatisticsComponent,
		NewProjectComponent,
		DeleteDirectionComponent,
	],
	imports: [SharedModule, ProjectsRoutingModule, TableModule, DynamicFilterModule],
})
export class ProjectsModule {}
