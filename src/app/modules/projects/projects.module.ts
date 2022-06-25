import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '../table/table.module';
import { DynamicFilterModule } from '../dynamic-filter/dynamic-filter.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsTableComponent } from './components/projects-table/projects-table.component';
import { ProjectPageContainerComponent } from './project-page/project-page-container.component';
import { TeamStatisticsComponent } from './components/team-statistics/team-statistics.component';
import { CreateEditProjectComponent } from './create-edit-project/create-edit-project.component';
import { ProjectInfoFormComponent } from './create-edit-project/project-info/project-info-form.component';
import { ProjectDetailsComponent } from './create-edit-project/project-details/project-details.component';
import { ProjectDescriptionFormComponent } from './create-edit-project/project-description/project-description-form.component';
import { TeamComponent } from './create-edit-project/team/team.component';
import { ManageUsersDialogComponent } from './create-edit-project/manage-users-dialog/manage-users-dialog.component';
import { ProjectInfoComponent } from './project-page/project-info/project-info.component';
import { StatusPipe } from './project-page/status.pipe';
import { AttachFilesComponent } from './create-edit-project/attach-files/attach-files.component';
import { EndDateLabelPipe } from './create-edit-project/project-details/end-date-label.pipe';
import { ProjectDescriptionComponent } from './project-page/project-description/project-description.component';
import { ProjectIdRouteContainerComponent } from './project-id-route-container/project-id-route-container.component';

@NgModule({
	declarations: [
		ProjectsTableComponent,
		ProjectPageContainerComponent,
		TeamStatisticsComponent,
		CreateEditProjectComponent,
		ProjectInfoFormComponent,
		ProjectDetailsComponent,
		ProjectDescriptionFormComponent,
		TeamComponent,
		ManageUsersDialogComponent,
		ProjectInfoComponent,
		StatusPipe,
		AttachFilesComponent,
		EndDateLabelPipe,
		ProjectDescriptionComponent,
		ProjectIdRouteContainerComponent,
	],
	imports: [SharedModule, ProjectsRoutingModule, TableModule, DynamicFilterModule],
})
export class ProjectsModule {}
