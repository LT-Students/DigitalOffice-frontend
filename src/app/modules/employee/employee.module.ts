import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { EmployeePageComponent } from './employee-page.component';
import { MainInfoComponent } from './components/main-info/main-info.component';
import { ProjectsComponent } from './components/projects/projects.component';

import { AdminRequestComponent } from './modals/admin-request/admin-request.component';
import { UploadPhotoComponent } from './modals/upload-photo/upload-photo.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { CommunicationsComponent } from './components/main-info/communications/communications.component';
import { EditContactComponent } from './components/main-info/communications/edit-contact/edit-contact.component';
import { AddContactComponent } from './components/main-info/communications/add-contact/add-contact.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';

@NgModule({
	declarations: [
		EmployeePageComponent,
		MainInfoComponent,
		AdminRequestComponent,
		ProjectsComponent,
		UploadPhotoComponent,
		CommunicationsComponent,
		EditContactComponent,
		AddContactComponent,
		ManageUsersComponent,
	],
	imports: [SharedModule, EmployeeRoutingModule],
	providers: [],
})
export class EmployeeModule {}
