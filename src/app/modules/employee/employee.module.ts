import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';

import { EmployeePageComponent } from './employee-page.component';
import { SkillsComponent } from './components/skills/skills.component';
import { MainInfoComponent } from './components/main-info/main-info.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';


@NgModule({
	declarations: [
		EmployeePageComponent,
		SkillsComponent,
		MainInfoComponent,
		ProjectsComponent,
		BreadcrumbsComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule,
		RouterModule,
	],
	providers: [],
})
export class EmployeeModule {}
