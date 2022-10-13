import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { finalize, switchMap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { LoadingState } from '@app/utils/loading-state';
import { WorkInfoConfigService } from '../work-info-config.service';

export interface IsAdminStatusConfig {
	isAdmin: boolean;
	submitFn: (...args: any[]) => Observable<any>;
}

@Component({
	selector: 'do-is-admin-status',
	template: `
		<mat-checkbox #checkbox [checked]="config.isAdmin" data-test="admin-status-checkbox">
			<span class="mat-body-2">Дать права администратора</span>
		</mat-checkbox>
		<button
			*ngIf="checkbox.checked !== config.isAdmin"
			class="submit"
			mat-flat-button
			color="warn"
			[loading]="loading$ | async"
			(click)="changeAdminStatus(checkbox.checked)"
			data-test="save-admin-status"
		>
			Сохранить
		</button>
	`,
	styles: [
		`
			:host {
				display: flex;
				align-items: center;
			}

			.submit {
				margin-left: auto;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsAdminStatusComponent extends LoadingState {
	@Input()
	set config(config: IsAdminStatusConfig | null) {
		if (config) {
			this._config = config;
		}
	}
	get config(): IsAdminStatusConfig {
		return this._config;
	}
	private _config: IsAdminStatusConfig = { isAdmin: false, submitFn: () => EMPTY };

	constructor(private workInfoConfig: WorkInfoConfigService) {
		super();
	}

	public changeAdminStatus(value: boolean): void {
		this.setLoading(true);
		this.config
			.submitFn(value)
			.pipe(
				switchMap(() => this.workInfoConfig.updateOnSuccess()),
				finalize(() => this.setLoading(false))
			)
			.subscribe();
	}
}
