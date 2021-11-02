import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextDirective } from '@app/directives/text.directive';
import { DndDirective } from '@app/directives/dnd.directive';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { ButtonLoadingDirective } from '@app/directives/buttonLoading.directive';
import { MdePopoverModule } from '@material-extended/mde';
import { MaterialModule } from './material.module';

import { ProfileImageComponent } from './component/profile-image/profile-image.component';
import { ContentContainerComponent } from './component/content-container/content-container.component';
import { SearchComponent } from './component/search/search.component';
import { HeaderComponent } from './component/header/header.component';
import { InputComponent } from './component/input/input.component';
import { DatepickerComponent } from './component/datepicker/datepicker.component';
import { StepperComponent } from './component/stepper/stepper.component';
import { PasswordComponent } from './component/password/password.component';
import { CommentComponent } from './component/comment/comment.component';
import { BreadcrumbsComponent } from './component/breadcrumbs/breadcrumbs.component';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { TitleDatepickerComponent } from './component/title-datepicker/title-datepicker.component';
import { DateTimePipe } from './pipes/date-time';
import { AddEmployeeComponent } from './modals/add-employee/add-employee.component';
import { EmptyListComponent } from './component/empty-list/empty-list.component';

@NgModule({
	declarations: [
		ProfileImageComponent,
		ContentContainerComponent,
		SearchComponent,
		HeaderComponent,
		InputComponent,
		DatepickerComponent,
		StepperComponent,
		TextDirective,
		DndDirective,
		ButtonLoadingDirective,
		CommentComponent,
		SafeHtmlPipe,
		PasswordComponent,
		CommentComponent,
		BreadcrumbsComponent,
		ConfirmDialogComponent,
		TitleDatepickerComponent,
		AddEmployeeComponent,
		DateTimePipe,
		EmptyListComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		InfiniteScrollModule,
		LoadingBarHttpClientModule,
		// LoadingBarRouterModule,
		LoadingBarModule,
		MdePopoverModule,
	],
	exports: [
		CommonModule,
		RouterModule,
		MaterialModule,
		InfiniteScrollModule,
		MdePopoverModule,
		ReactiveFormsModule,
		FormsModule,
		InputComponent,
		ProfileImageComponent,
		SearchComponent,
		HeaderComponent,
		TextDirective,
		DndDirective,
		ButtonLoadingDirective,
		DatepickerComponent,
		StepperComponent,
		SafeHtmlPipe,
		PasswordComponent,
		CommentComponent,
		ConfirmDialogComponent,
		BreadcrumbsComponent,
		TitleDatepickerComponent,
		DateTimePipe,
		AddEmployeeComponent,
		EmptyListComponent,
	],
})
export class SharedModule {}
