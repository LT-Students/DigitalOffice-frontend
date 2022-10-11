import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AutocompleteFilterParams, Filter } from '../../models';

@Component({
	selector: 'do-filter-autocomplete',
	template: `
		<do-form-field>
			<mat-form-field>
				<do-autocomplete
					[placeholder]="params?.placeholder"
					[formControl]="control"
					[options]="params.options$ | async"
					[displayWith]="params.displayWithFn"
					[valueGetter]="params.valueGetter"
					[filterFn]="params.filterFn"
				>
				</do-autocomplete>
			</mat-form-field>
		</do-form-field>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit, OnDestroy, Filter<AutocompleteFilterParams<any>> {
	public control = new UntypedFormControl(null);
	public params!: AutocompleteFilterParams<any>;
	private destroy$ = new Subject<void>();

	private onChange = () => {};
	private onTouched = () => {};

	constructor() {}

	public ngOnInit(): void {
		this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({ next: this.onChange });
	}

	public ngOnDestroy(): void {
		this.destroy$.unsubscribe();
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	public writeValue(value: any): void {
		this.control.setValue(value, { emitEvent: false });
	}
}
