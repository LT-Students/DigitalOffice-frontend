import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '@app/services/permission.service';
import { UserRights } from '@app/types/user-rights.enum';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
	selector: '[hasPermission]',
})
export class PermissionDirective implements OnInit, OnDestroy {
	@Input() hasPermission!: UserRights;
	private readonly destroy$ = new Subject<void>();

	constructor(
		private permissionService: PermissionService,
		private templateRef: TemplateRef<any>,
		private viewContainer: ViewContainerRef
	) {}

	public ngOnInit(): void {
		this.permissionService
			.checkPermission$(this.hasPermission)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (hasPermission: boolean) => {
					if (hasPermission) {
						this.viewContainer.createEmbeddedView(this.templateRef);
					} else {
						this.viewContainer.clear();
					}
				},
			});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
