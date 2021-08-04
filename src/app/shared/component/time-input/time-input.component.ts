import { Component, HostBinding, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
	selector: 'do-time-input',
	templateUrl: './time-input.component.html',
	styleUrls: ['./time-input.component.scss'],
	providers: [{ provide: MatFormFieldControl, useExisting: TimeInputComponent }],
})
export class TimeInputComponent implements OnInit, OnDestroy, MatFormFieldControl<number>, ControlValueAccessor {
	static nextId = 0;

	public timeForm: FormGroup;

	public shouldLabelFloat = true;
	public stateChanges = new Subject<void>();
	public focused = false;
	public controlType = 'time-input';
	public placeholder: string;
	public required: boolean;

	private _disabled = false;

	@HostBinding()
	public id = `time-input-${TimeInputComponent.nextId++}`;

	constructor(fb: FormBuilder, @Optional() @Self() public ngControl: NgControl) {
		this.timeForm = fb.group({
			hours: ['', [Validators.pattern('^[0-9]*$')]],
			minutes: ['', [Validators.min(0), Validators.max(59), Validators.pattern('^[0-9]*$')]],
		});
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}

		this.required = true;
	}

	ngOnInit() {
		this.timeForm.valueChanges.subscribe(() => this.onChange(this.value));
	}

	ngOnDestroy() {
		this.stateChanges.complete();
	}

	get empty(): boolean {
		const { hours, minutes } = this.timeForm.value;
		return !hours && !minutes;
	}

	@Input()
	get value(): number | null {
		console.log(this.timeForm);
		if (this.timeForm.valid) {
			const { hours, minutes } = this.timeForm.value;
			return +hours * 60 + +minutes;
		}
		return null;
	}
	set value(timeInMinutes: number | null) {
		const hours = Math.floor(timeInMinutes / 60).toString().padStart(2, '0');
		const minutes = (timeInMinutes % 60).toString().padStart(2, '0');
		this.timeForm.setValue({ hours, minutes });
		this.stateChanges.next();
	}

	@Input()
	get disabled(): boolean {
		return this._disabled;
	}
	set disabled(value: boolean) {
		this._disabled = coerceBooleanProperty(value);
		if (this._disabled) {
			this.timeForm.disable();
		} else {
			this.timeForm.enable();
		}
		this.stateChanges.next();
	}

	get errorState(): boolean {
		return this.timeForm.invalid && this.timeForm.dirty;
	}

	onChange = (value: number) => {};
	onTouched = () => {};

	onContainerClick(event: MouseEvent): void {}

	setDescribedByIds(ids: string[]): void {}

	writeValue(time: number | null): void {
		this.value = time;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	public autoFocusNext(event, input: HTMLElement): void {
		// if (event.target.value.toString().length === 2) {
		// 	input.focus();
		// }
	}

	public autoFocusPrev(event, input: HTMLElement): void {
		// if (event.target.value.toString().length === 0) {
		// 	input.focus();
		// }
	}

	public checkHoursConstraints(hours: number): void {
		if (hours < 0) {
			this.timeForm.patchValue({ hours: 0 });
		}
	}

	public checkMinutesConstraints(minutes: number): void {
		if (minutes < 0) {
			this.timeForm.patchValue({ minutes: 0 });
		} else if (minutes > 59) {
			this.timeForm.patchValue({ minutes: 59 });
		}
	}
}
