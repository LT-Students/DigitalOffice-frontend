import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextDirective } from '@app/directives/text.directive';
import { DndDirective } from '@app/directives/dnd.directive';
import { MaterialModule } from './material.module';

import { ButtonComponent } from './component/button/button.component';
import { SelectComponent } from './component/select/select.component';
import { ProfileImageComponent } from './component/profile-image/profile-image.component';
import { ContentContainerComponent } from './component/content-container/content-container.component';
import { SearchComponent } from './component/search/search.component';
import { HeaderComponent } from './component/header/header.component';
import { InputComponent } from './component/input/input.component';
import { DatepickerComponent } from './component/datepicker/datepicker.component';
import { StepperComponent } from './component/stepper/stepper.component';
import { HoursPipe } from './pipes/hours/hours.pipe';
<<<<<<< HEAD
import { PasswordComponent } from './component/password/password.component';
=======
import { CommentComponent } from './component/comment/comment.component';
>>>>>>> develop

@NgModule({
	declarations: [
		ButtonComponent,
		SelectComponent,
		ProfileImageComponent,
		ContentContainerComponent,
		SearchComponent,
		HeaderComponent,
		InputComponent,
		DatepickerComponent,
		StepperComponent,
		TextDirective,
		DndDirective,
		HoursPipe,
<<<<<<< HEAD
		PasswordComponent,
=======
		CommentComponent
>>>>>>> develop
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule
	],
	exports: [
		CommonModule,
		RouterModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule,
		InputComponent,
		ButtonComponent,
		SelectComponent,
		ProfileImageComponent,
		SearchComponent,
		HeaderComponent,
		TextDirective,
		DndDirective,
		DatepickerComponent,
		StepperComponent,
		HoursPipe,
<<<<<<< HEAD
		PasswordComponent,
=======
		CommentComponent
>>>>>>> develop
	],
})
export class SharedModule { }
