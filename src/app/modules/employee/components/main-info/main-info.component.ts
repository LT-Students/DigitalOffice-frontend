import { ChangeDetectionStrategy, Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateFormat } from '@app/types/date.enum';
import { ModalWidth } from '@app/services/dialog.service';
import { Icons } from '@shared/features/icons/icons';
import { PermissionService } from '@app/services/permission.service';
import { EditInfoComponent } from '../../dialogs/edit-info/edit-info.component';
import { UploadImageComponent } from '../../dialogs/upload-image/upload-image.component';
import { EmployeePageService } from '../../services/employee-page.service';

@Component({
	selector: 'do-employee-page-main-info',
	templateUrl: './main-info.component.html',
	styleUrls: ['./main-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainInfoComponent implements OnInit {
	public readonly Icons = Icons;

	public DateFormat = DateFormat;

	public user$ = this.employeePage.selectedUser$;
	public canEdit$ = this.employeePage.canManagePersonalInfo$();

	constructor(
		private employeePage: EmployeePageService,
		private permission: PermissionService,
		private dialog: MatDialog,
		private viewContainer: ViewContainerRef
	) {}

	public ngOnInit(): void {}

	public editUser(): void {
		this.dialog.open(EditInfoComponent, {
			data: this.user$,
			width: ModalWidth.L,
			autoFocus: false,
			viewContainerRef: this.viewContainer,
		});
	}

	public onAvatarUploadDialog(): void {
		this.dialog.open(UploadImageComponent, {
			width: ModalWidth.XL,
			height: 'auto',
			autoFocus: false,
			panelClass: 'upload-image-dialog',
			viewContainerRef: this.viewContainer,
		});
	}
}
