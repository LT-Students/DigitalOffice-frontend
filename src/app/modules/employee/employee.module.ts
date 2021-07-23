import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';

import { EmployeePageComponent } from './employee-page.component';
import { CompetencesComponent } from './components/competences/competences.component';
import { MainInfoComponent } from './components/main-info/main-info.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { AdminRequestComponent } from './modals/admin-request/admin-request.component';
import { ArchiveComponent } from './modals/archive/archive.component';
import { SkillsComponent } from './components/competences/skills/skills.component';
import { UploadPhotoComponent } from './modals/upload-photo/upload-photo.component';
import { AdminModule } from '../admin/admin.module';

@NgModule({
	declarations: [
		EmployeePageComponent,
		CompetencesComponent,
		MainInfoComponent,
		BreadcrumbsComponent,
		AdminRequestComponent,
		ArchiveComponent,
		SkillsComponent,
		ArchiveComponent,
		ProjectsComponent,
		UploadPhotoComponent,
	],
	imports: [CommonModule, SharedModule, MaterialModule, ReactiveFormsModule, FormsModule, RouterModule, AdminModule],
	providers: [],
})
export class EmployeeModule {}
