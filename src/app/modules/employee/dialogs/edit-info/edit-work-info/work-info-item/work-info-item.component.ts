import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ElementRef } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { FormControl } from '@angular/forms';
import { LoadingState } from '@shared/directives/button-loading.directive';
import { debounceTime, finalize, map, switchMap } from 'rxjs/operators';
import { InfiniteScrollDataProvider } from '@app/utils/infinite-scroll-data-provider';
import { Subject } from 'rxjs';
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

	@ViewChild('edit') editTemplate?: ElementRef;
	@Input() config!: WorkInfoConfig;
	public control = new FormControl(null);

	/**
	 * these variables are used for infinite autocomplete only
	 */
	public optionsProvider!: InfiniteScrollDataProvider<any>;
	public searchName$ = new Subject<string>();

	public isEditMode = false;

	constructor(private workInfoConfig: WorkInfoConfigService) {
		super();
	}

	public ngOnInit(): void {
		this.control.setValidators(this.config.validators || null);
		this.optionsProvider = new InfiniteScrollDataProvider(
			this.config.options$,
			this.searchName$.pipe(
				debounceTime(500),
				map((name: string) => ({ nameIncludeSubstring: name }))
			)
		);
	}

	public setEditMode(state: boolean): void {
		this.isEditMode = state;

		if (state) {
			const value = this.config.controlValueGetter(this.config.value);
			this.control.setValue(value);

			setTimeout(() => {
				if (this.editTemplate) {
					this.editTemplate.nativeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
				}
			});
		}
	}

	public handleScroll(): void {
		this.optionsProvider.loadOnScroll();
	}

	public onSubmit(): void {
		if (this.control.invalid) {
			this.control.markAsTouched();
			return;
		}

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
