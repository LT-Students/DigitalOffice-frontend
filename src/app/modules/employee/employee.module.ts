import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { AdminModule } from '../admin/admin.module';
import { EmployeePageComponent } from './employee-page.component';
import { CompetencesComponent } from './components/competences/competences.component';
import { MainInfoComponent } from './components/main-info/main-info.component';
import { ProjectsComponent } from './components/projects/projects.component';

import { AdminRequestComponent } from './modals/admin-request/admin-request.component';
import { ArchiveComponent } from './modals/archive/archive.component';
import { SkillsComponent } from './components/competences/skills/skills.component';
import { UploadPhotoComponent } from './modals/upload-photo/upload-photo.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { CommunicationsComponent } from './components/main-info/communications/communications.component';
import { EditContactComponent } from './components/main-info/communications/edit-contact/edit-contact.component';
import { AddContactComponent } from './components/main-info/communications/add-contact/add-contact.component';

@NgModule({
	declarations: [
		EmployeePageComponent,
		CompetencesComponent,
		MainInfoComponent,
		AdminRequestComponent,
		ArchiveComponent,
		SkillsComponent,
		ArchiveComponent,
		ProjectsComponent,
		UploadPhotoComponent,
		CommunicationsComponent,
		EditContactComponent,
		AddContactComponent,
	],
	imports: [SharedModule, AdminModule, EmployeeRoutingModule],
	providers: [],
})
export class EmployeeModule {}
