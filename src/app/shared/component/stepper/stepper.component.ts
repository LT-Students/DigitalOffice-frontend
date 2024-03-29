import { Component, Input, ChangeDetectionStrategy, HostBinding, OnDestroy, Optional, Self } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { DoValidators } from '@app/validators/do-validators';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
	selector: 'do-stepper',
	templateUrl: './stepper.component.html',
	styleUrls: ['./stepper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: MatFormFieldControl,
			useExisting: StepperComponent,
		},
	],
})
export class StepperComponent implements OnDestroy, MatFormFieldControl<number>, ControlValueAccessor {
	private static _uniqueId = 0;

	@Input()
	public step: number;

	@Input()
	public min: number;

	@Input()
	public max: number;

	@Input()
	public set value(value: number) {
		if (value >= this.max) {
			this.stepperControl.patchValue(this.max);
		} else if (value <= this.min) {
			this.stepperControl.patchValue(this.min);
		} else {
			this.stepperControl.patchValue(value);
		}

		this.stateChanges.next();
	}

	public get value(): number {
		return this.stepperControl.value;
	}

	public stateChanges: Subject<void>;

	@HostBinding()
	public id: string;

	@Input()
	public set placeholder(value: string) {
		this._placeholder = value;
		this.stateChanges.next();
	}

	public get placeholder(): string {
		return this._placeholder ?? '';
	}

	private _placeholder?: string;

	public focused: boolean;

	public empty: boolean;

	@HostBinding()
	public get shouldLabelFloat(): boolean {
		return true;
	}

	@Input()
	public set required(value: boolean | string) {
		this._required = coerceBooleanProperty(value);
		this.stateChanges.next();
	}

	public get required(): boolean {
		return this._required;
	}

	private _required: boolean;

	@Input()
	public set disabled(value: boolean | string) {
		this._disabled = coerceBooleanProperty(value);
		if (this._disabled) {
			this.stepperControl.disable();
		} else {
			this.stepperControl.enable();
		}
		this.stateChanges.next();
	}

	public get disabled(): boolean {
		return this._disabled;
	}

	private _disabled: boolean;

	public errorState: boolean;

	public controlType?: string | undefined;

	@HostBinding('attr.aria-describedby')
	public userAriaDescribedBy?: string | undefined;

	public stepperControl: UntypedFormControl;

	constructor(@Optional() @Self() public ngControl: NgControl | null) {
		this._required = false;
		this._disabled = false;
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
		this.focused = true;
		this.stateChanges = new Subject<void>();
		this.stepperControl = new UntypedFormControl(0, [DoValidators.floatNumber]);
		this.placeholder = '';
		this.step = 1;
		this.min = Number.MIN_SAFE_INTEGER;
		this.max = Number.MAX_SAFE_INTEGER;
		this.id = `custom-stepper-field-id-${StepperComponent._uniqueId++}`;
		this.empty = false;
		this.errorState = false;
		this.userAriaDescribedBy = '';
		this.ngControl = null;
	}

	public ngOnDestroy(): void {
		this.stateChanges.complete();
	}

	public writeValue(value: number): void {
		this.value = Number(value);
	}

	public onChange(value: number): void {}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public onTouch(): void {}

	public registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	public setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
		this.stateChanges.next();
	}

	public setDescribedByIds(ids: string[]): void {
		this.userAriaDescribedBy = ids.join(' ');
	}

	public onContainerClick(event: MouseEvent): void {}

	public onChangeClick(step: number): void {
		this.value += step;
		this.stateChanges.next();
		this.onChange(this.value);
	}
}
