import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { MdePopoverModule } from '@material-extended/mde';
import { NewEmployeeComponent } from '@shared/modals/new-employee/new-employee.component';
import { AddEditDepartmentComponent } from '@shared/modals/add-edit-department/add-edit-department.component';
import { UserStatusPipe } from '@shared/pipes/user-status.pipe';
import { PlaceholderPipe } from '@shared/pipes/placeholder.pipe';
import { MaterialModule } from './modules/material/material.module';

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
import { PhoneInputComponent } from './component/phone-input/phone-input.component';
import { LoadingBarRoutingModule } from './modules/loading-bar-routing/loading-bar-routing.module';
import { ChangeUserPasswordComponent } from './modals/change-user-password/change-user-password.component';
import { FullNamePipe } from './pipes/full-name.pipe';
import { DndDirective } from './directives/dnd.directive';
import { TextDirective } from './directives/text.directive';
import { BlockPasteDirective } from './directives/block-paste.directive';
import { ButtonLoadingDirective } from './directives/buttonLoading.directive';
import { TransformNameDirective } from './directives/transform-name.directive';
import { PasswordHintComponent } from './component/password-hint/password-hint.component';
import { ProjectTypePipe } from './pipes/project-type.pipe';
import { LeaveLabelPipe } from './pipes/leave-label.pipe';

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
		SafeHtmlPipe,
		PasswordComponent,
		CommentComponent,
		BreadcrumbsComponent,
		ConfirmDialogComponent,
		TitleDatepickerComponent,
		AddEmployeeComponent,
		DateTimePipe,
		EmptyListComponent,
		PhoneInputComponent,
		ChangeUserPasswordComponent,
		BlockPasteDirective,
		FullNamePipe,
		TransformNameDirective,
		PasswordHintComponent,
		ProjectTypePipe,
		LeaveLabelPipe,
		NewEmployeeComponent,
		AddEditDepartmentComponent,
		UserStatusPipe,
		PlaceholderPipe,
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		InfiniteScrollModule,
		LoadingBarModule,
		LoadingBarRoutingModule,
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
		PhoneInputComponent,
		ChangeUserPasswordComponent,
		BlockPasteDirective,
		FullNamePipe,
		TransformNameDirective,
		PasswordHintComponent,
		ProjectTypePipe,
		LeaveLabelPipe,
		NewEmployeeComponent,
		AddEditDepartmentComponent,
		UserStatusPipe,
		PlaceholderPipe,
	],
})
export class SharedModule {}
