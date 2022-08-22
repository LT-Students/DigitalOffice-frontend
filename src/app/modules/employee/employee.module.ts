import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { EmployeePageComponent } from './employee-page.component';
import { MainInfoComponent } from './components/main-info/main-info.component';
import { ProjectsComponent } from './components/projects/projects.component';

import { UploadImageComponent } from './dialogs/upload-image/upload-image.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { CommunicationsComponent } from './components/communications/communications.component';
import { EditContactComponent } from './components/communications/edit-contact/edit-contact.component';
import { AddContactComponent } from './components/communications/add-contact/add-contact.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserListItemComponent } from './components/user-list/user-list-item/user-list-item.component';
import { EditInfoComponent } from './dialogs/edit-info/edit-info.component';
import { SelectImageComponent } from './dialogs/upload-image/select-image/select-image.component';
import { AdjustImageComponent } from './dialogs/upload-image/adjust-image/adjust-image.component';
import { EditWorkInfoComponent } from './dialogs/edit-info/edit-work-info/edit-work-info.component';
import { WorkInfoItemComponent } from './dialogs/edit-info/edit-work-info/work-info-item/work-info-item.component';
import { IsAdminStatusComponent } from './dialogs/edit-info/edit-work-info/is-admin-status/is-admin-status.component';
import { EditPersonalInfoComponent } from './dialogs/edit-info/edit-personal-info/edit-personal-info.component';
import { WorkingHoursPipe } from './working-hours.pipe';
import { GenderSelectComponent } from './components/gender-select/gender-select.component';
import { CommunicationItemComponent } from './components/communications/communication-item/communication-item.component';
import { CommunicationTypePipe } from './components/communications/communication-item/communication-type.pipe';

@NgModule({
	declarations: [
		EmployeePageComponent,
		MainInfoComponent,
		ProjectsComponent,
		UploadImageComponent,
		CommunicationsComponent,
		EditContactComponent,
		AddContactComponent,
		UserListComponent,
		UserListItemComponent,
		EditInfoComponent,
		SelectImageComponent,
		AdjustImageComponent,
		EditWorkInfoComponent,
		WorkInfoItemComponent,
		IsAdminStatusComponent,
		EditPersonalInfoComponent,
		WorkingHoursPipe,
		GenderSelectComponent,
		CommunicationItemComponent,
		CommunicationTypePipe,
	],
	imports: [SharedModule, EmployeeRoutingModule],
	providers: [],
})
export class EmployeeModule {}
