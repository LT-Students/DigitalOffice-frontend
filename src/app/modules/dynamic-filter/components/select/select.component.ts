import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Filter, SelectFilterParams } from '../../models';

@Component({
	selector: 'do-select',
	template: `
		<do-form-field>
			<mat-form-field>
				<mat-select [formControl]="control" [placeholder]="params.placeholder | placeholder: ''">
					<mat-option *ngIf="params.allowReset">—</mat-option>
					<mat-option
						*ngFor="let option of params.options$ | async"
						[value]="option | execute: params.valueGetter"
					>
						<mat-icon
							*ngIf="params.icon as icon"
							[svgIcon]="icon"
							[style.color]="params.iconColor ? (option | execute: params.iconColor) : ''"
						></mat-icon
						>{{ option | execute: params.displayValueGetter }}</mat-option
					>
				</mat-select>
			</mat-form-field>
		</do-form-field>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit, OnDestroy, Filter<SelectFilterParams<any>> {
	public control = new UntypedFormControl('');
	public params!: SelectFilterParams<any>;
	private subscription!: Subscription;

	constructor() {}

	public ngOnInit(): void {
		this.subscription = this.control.valueChanges.subscribe({ next: this.onChange });
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	public writeValue(value: string): void {
		this.control.setValue(value);
	}

	private onChange = () => {};
	private onTouched = () => {};
}
