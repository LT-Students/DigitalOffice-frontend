import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { FormControl } from '@angular/forms';
import { LoadingState } from '@shared/directives/button-loading.directive';
import { finalize, switchMap } from 'rxjs/operators';
import { WorkInfoConfigService } from '../work-info-config.service';
import { WorkInfoConfig } from './work-info-item';

@Component({
	selector: 'do-work-info-item',
	templateUrl: './work-info-item.component.html',
	styleUrls: ['./work-info-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkInfoItemComponent extends LoadingState implements OnInit {
	public readonly Icons = Icons;

	@Input() config!: WorkInfoConfig;
	public control = new FormControl(null);

	public isEditMode = false;

	constructor(private workInfoConfig: WorkInfoConfigService) {
		super();
	}

	public ngOnInit(): void {
		this.control.setValue(this.config.value);
		this.control.setValidators(this.config.validators || null);
	}

	public setEditMode(state: boolean): void {
		this.isEditMode = state;
	}

	public onSubmit(): void {
		this.setLoading(true);
		const value = this.control.value;
		this.config
			.submitFn(value)
			.pipe(
				switchMap(() => this.workInfoConfig.updateOnSuccess()),
				finalize(() => {
					this.setLoading(false);
				})
			)
			.subscribe({ complete: () => this.setEditMode(false) });
	}
}
