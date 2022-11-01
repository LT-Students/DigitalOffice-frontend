import { ChangeDetectionStrategy, Component, ViewContainerRef } from '@angular/core';
import { DateFormat } from '@app/types/date.enum';
import { ModalWidth } from '@app/services/dialog.service';
import { Icons } from '@shared/modules/icons/icons';
import { PermissionService } from '@app/services/permission.service';
import { UserRights } from '@app/types/user-rights.enum';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppRoutes } from '@app/models/app-routes';
import { DialogService } from '@shared/component/dialog/dialog.service';
import { EditInfoComponent } from '../../dialogs/edit-info/edit-info.component';
import { UploadImageComponent } from '../../dialogs/upload-image/upload-image.component';
import { EmployeePageService } from '../../services/employee-page.service';

@Component({
	selector: 'do-employee-page-main-info',
	templateUrl: './main-info.component.html',
	styleUrls: ['./main-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainInfoComponent {
	public readonly Icons = Icons;
	public readonly DateFormat = DateFormat;
	public readonly AppRoutes = AppRoutes;

	public user$ = this.employeePage.selectedUser$;
	public canEdit$ = this.employeePage.canManagePersonalInfo$();
	public canEditWorkInfo$ = combineLatest([
		this.permission.checkPermission$(UserRights.AddEditRemovePositions),
		this.permission.checkPermission$(UserRights.AddEditRemoveCompanyData),
		this.permission.checkPermission$(UserRights.AddRemoveUsersRoles),
	]).pipe(map((permissions: boolean[]) => permissions.some(Boolean)));

	constructor(
		private employeePage: EmployeePageService,
		private permission: PermissionService,
		private dialog: DialogService,
		private viewContainer: ViewContainerRef
	) {}

	public editUser(): void {
		this.dialog.open(EditInfoComponent, {
			data: this.user$,
			width: ModalWidth.M,
			autoFocus: false,
			viewContainerRef: this.viewContainer,
		});
	}

	public onAvatarUploadDialog(): void {
		this.dialog.open(UploadImageComponent, {
			width: ModalWidth.M,
			height: 'auto',
			autoFocus: false,
			panelClass: 'upload-image-dialog',
			viewContainerRef: this.viewContainer,
		});
	}
}
