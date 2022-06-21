import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '../table/table.module';
import { DynamicFilterModule } from '../dynamic-filter/dynamic-filter.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsTableComponent } from './components/projects-table/projects-table.component';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { TeamStatisticsComponent } from './components/team-statistics/team-statistics.component';
import { CreateEditProjectComponent } from './create-edit-project/create-edit-project.component';
import { ProjectInfoComponent } from './create-edit-project/project-info/project-info.component';
import { ProjectDetailsComponent } from './create-edit-project/project-details/project-details.component';
import { ProjectDescriptionComponent } from './create-edit-project/project-description/project-description.component';
import { TeamComponent } from './create-edit-project/team/team.component';

@NgModule({
	declarations: [
		ProjectsTableComponent,
		ProjectPageComponent,
		TeamStatisticsComponent,
		CreateEditProjectComponent,
		ProjectInfoComponent,
		ProjectDetailsComponent,
		ProjectDescriptionComponent,
		TeamComponent,
	],
	imports: [SharedModule, ProjectsRoutingModule, TableModule, DynamicFilterModule],
})
export class ProjectsModule {}
