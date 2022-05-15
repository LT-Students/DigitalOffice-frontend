import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '@app/services/permission.service';
import { UserRights } from '@app/types/user-rights.enum';

@Directive({
	selector: '[doPermission]',
})
export class PermissionDirective {
	constructor(
		private permissionService: PermissionService,
		private templateRef: TemplateRef<any>,
		private viewContainer: ViewContainerRef
	) {}

	@Input() set doPermission(permission: UserRights) {
		if (this.permissionService.checkPermission(permission)) {
			this.viewContainer.createEmbeddedView(this.templateRef);
		}
	}
}
