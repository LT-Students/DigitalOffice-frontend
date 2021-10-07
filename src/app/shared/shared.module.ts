import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextDirective } from '@app/directives/text.directive';
import { DndDirective } from '@app/directives/dnd.directive';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from './material.module';

import { SelectComponent } from './component/select/select.component';
import { ProfileImageComponent } from './component/profile-image/profile-image.component';
import { ContentContainerComponent } from './component/content-container/content-container.component';
import { SearchComponent } from './component/search/search.component';
import { HeaderComponent } from './component/header/header.component';
import { InputComponent } from './component/input/input.component';
import { DatepickerComponent } from './component/datepicker/datepicker.component';
import { StepperComponent } from './component/stepper/stepper.component';
import { HoursPipe } from './pipes/hours/hours.pipe';
import { PasswordComponent } from './component/password/password.component';
import { CommentComponent } from './component/comment/comment.component';
import { BreadcrumbsComponent } from './component/breadcrumbs/breadcrumbs.component';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { TitleDatepickerComponent } from './component/title-datepicker/title-datepicker.component';

@NgModule({
	declarations: [
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
		SafeHtmlPipe,
		PasswordComponent,
		CommentComponent,
		BreadcrumbsComponent,
		ConfirmDialogComponent,
		TitleDatepickerComponent
	],
	imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MaterialModule, InfiniteScrollModule],
	exports: [
		CommonModule,
		RouterModule,
		MaterialModule,
		InfiniteScrollModule,
		ReactiveFormsModule,
		FormsModule,
		InputComponent,
		SelectComponent,
		ProfileImageComponent,
		SearchComponent,
		HeaderComponent,
		TextDirective,
		DndDirective,
		DatepickerComponent,
		StepperComponent,
		HoursPipe,
		SafeHtmlPipe,
		PasswordComponent,
		CommentComponent,
		ConfirmDialogComponent,
		BreadcrumbsComponent,
		TitleDatepickerComponent
	],
})
export class SharedModule {}
