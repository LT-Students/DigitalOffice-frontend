import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextDirective } from '@app/directives/text.directive';
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
import { TimeInputComponent } from './component/time-input/time-input.component';

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
		TimeInputComponent,
	],
	imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MaterialModule],
	exports: [
		InputComponent,
		ButtonComponent,
		SelectComponent,
		ProfileImageComponent,
		SearchComponent,
		HeaderComponent,
		TextDirective,
		MaterialModule,
		DatepickerComponent,
		StepperComponent,
	],
})
export class SharedModule {}
