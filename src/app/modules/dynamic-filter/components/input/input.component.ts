import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Filter, InputFilterParams } from '../../models';

@Component({
	selector: 'do-input',
	template: `
		<do-form-field>
			<mat-form-field>
				<input
					matInput
					[placeholder]="params?.placeholder || ''"
					type="search"
					name="search"
					autocomplete="off"
					[formControl]="control"
				/>
				<mat-icon
					class="text-secondary_default"
					matSuffix
					*ngIf="params?.icon as icon"
					[svgIcon]="icon"
				></mat-icon>
			</mat-form-field>
		</do-form-field>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit, OnDestroy, Filter<InputFilterParams> {
	public control = new UntypedFormControl('');
	private subscription!: Subscription;
	public params?: InputFilterParams;
	private onChange = () => {};
	private onTouched = () => {};

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
}
