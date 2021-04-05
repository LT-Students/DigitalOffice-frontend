import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';

import { EmployeePageComponent } from './employee-page.component';
import { EmployeePageSkillsComponent } from './components/employee-page-skills/employee-page-skills.component';


@NgModule({
	declarations: [
		EmployeePageComponent,
		EmployeePageSkillsComponent
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
