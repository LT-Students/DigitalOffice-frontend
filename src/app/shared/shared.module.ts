import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NewEmployeeComponent } from '@shared/dialogs/new-employee/new-employee.component';
import { PlaceholderPipe } from '@shared/pipes/placeholder.pipe';
import { UserRecoveryComponent } from '@shared/dialogs/user-recovery/user-recovery.component';
import { CapitalizePipe } from '@shared/pipes/capitalize.pipe';
import { ImageCropperModule } from 'ngx-image-cropper';
import { IconsModule } from '@shared/modules/icons/icons.module';
import { OptionComponent } from '@shared/component/option/option.component';
import { PortalModule } from '@angular/cdk/portal';
import { MaterialModule } from './modules/material/material.module';

import { ProfileImageComponent } from './component/profile-image/profile-image.component';
import { StepperComponent } from './component/stepper/stepper.component';
import { PasswordComponent } from './component/password/password.component';
import { CommentComponent } from './component/comment/comment.component';
import { BreadcrumbsComponent } from './component/breadcrumbs/breadcrumbs.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { TitleDatepickerComponent } from './component/title-datepicker/title-datepicker.component';
import { DateTimePipe } from './pipes/date-time';
import { EmptyListComponent } from './component/empty-list/empty-list.component';
import { PhoneInputComponent } from './component/phone-input/phone-input.component';
import { ChangeUserPasswordComponent } from './dialogs/change-user-password/change-user-password.component';
import { FullNamePipe } from './pipes/full-name.pipe';
import { DndDirective } from './directives/dnd.directive';
import { TextDirective } from './directives/text.directive';
import { BlockPasteDirective } from './directives/block-paste.directive';
import { ButtonLoadingDirective } from './directives/button-loading.directive';
import { TransformNameDirective } from './directives/transform-name.directive';
import { ValidationHintComponent } from './component/validation-hint/validation-hint.component';
import { TruncateTooltipDirective } from './directives/truncate-tooltip.directive';
import { LeaveLabelPipe } from './pipes/leave-label.pipe';
import { FormFieldComponent } from './component/form-row/form-field.component';
import { SelectDirective } from './directives/select.directive';
import { ImageUrlPipe } from './pipes/image-url.pipe';
import { ContextMenuComponent } from './component/context-menu/context-menu.component';
import { ButtonToggleGroupComponent } from './component/button-toggle/button-toggle-group.component';
import { ButtonToggleComponent } from './component/button-toggle/button-toggle.component';
import { ExecutePipe } from './pipes/execute.pipe';
import { EmailListComponent } from './dialogs/user-recovery/email-list/email-list.component';
import { EmailItemComponent } from './dialogs/user-recovery/email-item/email-item.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { PermissionDirective } from './directives/permission.directive';
import { ButtonDirective } from './directives/button.directive';
import { DynamicComponentHostDirective } from './directives/dynamic-component-host.directive';
import { AutocompleteComponent } from './component/autocomplete/autocomplete.component';
import { AutocompleteOffDirective } from './directives/autocomplete-off.directive';
import { ActionsComponent } from './component/actions/actions.component';
import { ControlErrorsPipe } from './pipes/control-errors.pipe';
import { InfoDialogComponent } from './dialogs/info-dialog/info-dialog.component';
import { TimeInputComponent } from './component/time-input/time-input.component';
import { SnackbarComponent } from './component/snackbar/snackbar.component';
import { NumberInputDirective } from './directives/number-input.directive';
import { PaginatorComponent } from './component/paginator/paginator.component';
import { FormatBytesPipe } from './pipes/format-bytes.pipe';
import { FileIconPipe } from './pipes/file-icon.pipe';
import { TitleDatepickerV2Component } from './component/title-datepicker/title-datepicker-v2.component';
import { DeselectAllCheckboxComponent } from './component/deselect-all-checkbox/deselect-all-checkbox.component';
import { TypeFromExtensionPipe } from './pipes/type-from-extension.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { ImageViewerComponent } from './component/image-viewer/image-viewer.component';
import { SafeImageUrlPipe } from './pipes/safe-image-url.pipe';
import { RemoveRedundantSpacesDirective } from './directives/remove-redundant-spaces.directive';
import { PopoverComponent } from './component/popover/popover.component';
import { PopoverTriggerDirective } from './component/popover/popover-trigger.directive';
import { DialogComponent } from './component/dialog/dialog.component';
import { DialogCloseDirective } from './component/dialog/dialog-close.directive';
import { UserAvatarComponent } from './component/user-avatar/user-avatar.component';

@NgModule({
	declarations: [
		ProfileImageComponent,
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
		DateTimePipe,
		EmptyListComponent,
		PhoneInputComponent,
		ChangeUserPasswordComponent,
		BlockPasteDirective,
		FullNamePipe,
		TransformNameDirective,
		ValidationHintComponent,
		TruncateTooltipDirective,
		LeaveLabelPipe,
		NewEmployeeComponent,
		PlaceholderPipe,
		UserRecoveryComponent,
		CapitalizePipe,
		FormFieldComponent,
		SelectDirective,
		ImageUrlPipe,
		ContextMenuComponent,
		ButtonToggleGroupComponent,
		ButtonToggleComponent,
		ExecutePipe,
		EmailListComponent,
		EmailItemComponent,
		AutofocusDirective,
		PermissionDirective,
		ButtonDirective,
		DynamicComponentHostDirective,
		AutocompleteComponent,
		OptionComponent,
		AutocompleteOffDirective,
		ActionsComponent,
		ControlErrorsPipe,
		InfoDialogComponent,
		TimeInputComponent,
		SnackbarComponent,
		NumberInputDirective,
		PaginatorComponent,
		FormatBytesPipe,
		FileIconPipe,
		TitleDatepickerV2Component,
		DeselectAllCheckboxComponent,
		TypeFromExtensionPipe,
		JoinPipe,
		ImageViewerComponent,
		SafeImageUrlPipe,
		RemoveRedundantSpacesDirective,
		PopoverComponent,
		PopoverTriggerDirective,
		DialogComponent,
		DialogCloseDirective,
		UserAvatarComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		InfiniteScrollModule,
		ImageCropperModule,
		IconsModule,
		PortalModule,
	],
	exports: [
		CommonModule,
		RouterModule,
		MaterialModule,
		IconsModule,
		InfiniteScrollModule,
		ImageCropperModule,
		ReactiveFormsModule,
		FormsModule,
		ProfileImageComponent,
		TextDirective,
		DndDirective,
		ButtonLoadingDirective,
		StepperComponent,
		SafeHtmlPipe,
		PasswordComponent,
		CommentComponent,
		ConfirmDialogComponent,
		BreadcrumbsComponent,
		TitleDatepickerComponent,
		DateTimePipe,
		EmptyListComponent,
		PhoneInputComponent,
		ChangeUserPasswordComponent,
		BlockPasteDirective,
		FullNamePipe,
		TransformNameDirective,
		ValidationHintComponent,
		TruncateTooltipDirective,
		LeaveLabelPipe,
		NewEmployeeComponent,
		PlaceholderPipe,
		UserRecoveryComponent,
		CapitalizePipe,
		FormFieldComponent,
		SelectDirective,
		ImageUrlPipe,
		ContextMenuComponent,
		ButtonToggleGroupComponent,
		ButtonToggleComponent,
		ExecutePipe,
		AutofocusDirective,
		PermissionDirective,
		ButtonDirective,
		DynamicComponentHostDirective,
		AutocompleteComponent,
		OptionComponent,
		AutocompleteOffDirective,
		ActionsComponent,
		ControlErrorsPipe,
		TimeInputComponent,
		NumberInputDirective,
		PaginatorComponent,
		FormatBytesPipe,
		FileIconPipe,
		TitleDatepickerV2Component,
		DeselectAllCheckboxComponent,
		TypeFromExtensionPipe,
		JoinPipe,
		ImageViewerComponent,
		SafeImageUrlPipe,
		RemoveRedundantSpacesDirective,
		PopoverComponent,
		PopoverTriggerDirective,
		DialogCloseDirective,
		UserAvatarComponent,
	],
})
export class SharedModule {}
