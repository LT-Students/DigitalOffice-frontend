import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { LoadingState } from '@shared/directives/button-loading.directive';
import { finalize, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WorkInfoConfigService } from '../work-info-config.service';

export interface IsAdminStatusConfig {
	isAdmin: boolean;
	disabled: boolean;
	submitFn: (...args: any[]) => Observable<any>;
}

@Component({
	selector: 'do-is-admin-status',
	template: `
		<mat-checkbox #checkbox [disabled]="config.disabled" [checked]="config.isAdmin">
			<span class="mat-body-2">Дать права администратора</span>
		</mat-checkbox>
		<button
			*ngIf="checkbox.checked !== config.isAdmin"
			class="submit"
			mat-flat-button
			color="warn"
			[loading]="loading$ | async"
			(click)="changeAdminStatus(checkbox.checked)"
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
export class IsAdminStatusComponent extends LoadingState implements OnInit {
	@Input() config!: IsAdminStatusConfig;

	constructor(private workInfoConfig: WorkInfoConfigService) {
		super();
	}

	ngOnInit(): void {}

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
