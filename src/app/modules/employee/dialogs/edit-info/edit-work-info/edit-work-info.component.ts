import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoadingState } from '@shared/directives/button-loading.directive';
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

	constructor(private workInfoConfig: WorkInfoConfigService) {
		super();
	}

	ngOnInit(): void {}
}
