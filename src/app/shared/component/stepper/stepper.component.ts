import { Component, Input, ChangeDetectionStrategy, HostBinding, OnDestroy, Optional, Self, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { DoValidators } from '@app/validators/do-validators';
import { Subject } from 'rxjs';

@Component({
	selector: 'do-stepper',
	templateUrl: './stepper.component.html',
	styleUrls: ['./stepper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{
		provide: MatFormFieldControl,
		useExisting: StepperComponent
	}]
})
export class StepperComponent implements OnDestroy, OnChanges, MatFormFieldControl<number>, ControlValueAccessor {
	@Input()
	public label: string;

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
	};
	public get value(): number {
		return this.stepperControl.value;
	};

	public stateChanges: Subject<void>;

	@HostBinding()
	public id: string;

	@Input()
	public set placeholder(value: string) {
		this._placeholder = value;
		this.stateChanges.next();
	};
	public get placeholder(): string {
		return this._placeholder ?? '';
	};

	public focused: boolean;

	public empty: boolean;

	@HostBinding()
	public get shouldLabelFloat(): boolean {
		return true;
	};

	@Input()
	public required: boolean;

	@Input()
	public disabled: boolean;

	errorState: boolean;

	controlType?: string | undefined;

	@HostBinding('attr.aria-describedby')
	public userAriaDescribedBy?: string | undefined;

	static uniqueId: number = 0;

	private _placeholder?: string;

	public stepperControl: FormControl;

	constructor(
		@Optional() @Self() public ngControl: NgControl | null
	) {
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
		this.label = "";
		this.focused = true;
		this.stateChanges = new Subject<void>();
		this.stepperControl = new FormControl(0, [DoValidators.number])
		this.placeholder = "";
		this.step = 1;
		this.min = Number.MIN_SAFE_INTEGER;
		this.max = Number.MAX_SAFE_INTEGER;
		this.id = `user-stepper-field-id-${StepperComponent.uniqueId++}`;
		this.required = false;
		this.empty = false;
		this.disabled = false;
		this.errorState = false;
		this.userAriaDescribedBy = '';
		this.ngControl = null;
	}

	public writeValue(value: number): void {
		this.value = Number(value);
	}

	public onChange(value: number): void { }
	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public onTouch(): void { }
	public registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	public setDisabledState(isDisabled: boolean) {
		this.disabled = isDisabled;
		isDisabled ? this.stepperControl.disable() : this.stepperControl.enable();
		this.stateChanges.next();
	}

	public setDescribedByIds(ids: string[]): void {
		this.userAriaDescribedBy = ids.join(' ');
	}

	public onContainerClick(event: MouseEvent): void {

	}

	public onChangeClick(step: number) {
		this.value += step;
		this.stateChanges.next();
		this.onChange(this.value);
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.disabled?.currentValue !== changes.disabled?.previousValue) {
			this.setDisabledState(changes.disabled.currentValue);
		}
	}

	ngOnDestroy() {
		this.stateChanges.complete();
	}
}
