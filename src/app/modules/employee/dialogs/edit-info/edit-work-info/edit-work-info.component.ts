import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PermissionService } from '@app/services/permission.service';
import { LoadingState } from '@app/utils/loading-state';
import { WorkInfoConfigService } from './work-info-config.service';

@Component({
	selector: 'do-edit-work-info',
	templateUrl: './edit-work-info.component.html',
	styleUrls: ['./edit-work-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [WorkInfoConfigService],
})
export class EditWorkInfoComponent extends LoadingState implements OnInit {
	public configs$ = this.workInfoConfig.getConfig$();
	public adminConfig$ = this.workInfoConfig.adminCheckboxConfig$();
	public isAdmin$ = this.permission.isAdmin$;

	constructor(private workInfoConfig: WorkInfoConfigService, private permission: PermissionService) {
		super();
	}

	ngOnInit(): void {}
}
