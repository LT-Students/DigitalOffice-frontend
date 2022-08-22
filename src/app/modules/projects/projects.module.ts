import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TableModule } from '../table/table.module';
import { DynamicFilterModule } from '../dynamic-filter/dynamic-filter.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsTableComponent } from './projects-table/projects-table.component';
import { ProjectPageContainerComponent } from './project-page/project-page-container.component';
import { CreateEditProjectComponent } from './create-edit-project/create-edit-project.component';
import { ProjectInfoFormComponent } from './create-edit-project/project-info/project-info-form.component';
import { ProjectDetailsComponent } from './create-edit-project/project-details/project-details.component';
import { ProjectDescriptionFormComponent } from './create-edit-project/project-description/project-description-form.component';
import { ProjectInfoComponent } from './project-page/project-info/project-info.component';
import { StatusPipe } from './project-page/status.pipe';
import { EndDateLabelPipe } from './create-edit-project/project-details/end-date-label.pipe';
import { ProjectDescriptionComponent } from './project-page/project-description/project-description.component';
import { ProjectIdRouteContainerComponent } from './project-id-route-container/project-id-route-container.component';
import { ProjectFilesComponent } from './project-page/project-files/project-files.component';
import { ProjectUsersComponent } from './project-page/project-users/project-users.component';
import { AddProjectUsersComponent } from './add-project-users/add-project-users.component';
import { AddFilesComponent } from './add-files/add-files.component';
import { UploadProgressComponent } from './add-files/upload-progress/upload-progress.component';
import { UploadItemComponent } from './add-files/upload-progress/upload-item.component';
import { EditFileComponent } from './project-page/project-files/edit-file/edit-file.component';
import { DownloadFilesComponent } from './download-files/download-files.component';
import { DownloadItemComponent } from './download-files/download-item.component';

@NgModule({
	declarations: [
		ProjectsTableComponent,
		ProjectPageContainerComponent,
		CreateEditProjectComponent,
		ProjectInfoFormComponent,
		ProjectDetailsComponent,
		ProjectDescriptionFormComponent,
		ProjectInfoComponent,
		StatusPipe,
		EndDateLabelPipe,
		ProjectDescriptionComponent,
		ProjectIdRouteContainerComponent,
		ProjectFilesComponent,
		ProjectUsersComponent,
		AddProjectUsersComponent,
		AddFilesComponent,
		UploadProgressComponent,
		UploadItemComponent,
		EditFileComponent,
		DownloadFilesComponent,
		DownloadItemComponent,
	],
	imports: [SharedModule, ProjectsRoutingModule, TableModule, DynamicFilterModule, MatProgressBarModule],
})
export class ProjectsModule {}
