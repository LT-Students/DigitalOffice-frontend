import { Component, HostBinding, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { Time } from '@angular/common';

enum TimeType {
	HOURS,
	MINUTES,
}

@Component({
	selector: 'do-time-input',
	templateUrl: './time-input.component.html',
	styleUrls: ['./time-input.component.scss'],
	providers: [{ provide: MatFormFieldControl, useExisting: TimeInputComponent }],
})
export class TimeInputComponent implements OnInit, OnDestroy, MatFormFieldControl<Time>, ControlValueAccessor {
	static nextId = 0;

	public time: FormGroup;
	public TimeType = TimeType;

	public shouldLabelFloat = true;
	public stateChanges = new Subject<void>();
	public focused = false;
	public controlType = 'time-input';
	public disabled = false;
	public placeholder: string;
	public required: boolean;

	@HostBinding()
	public id = `time-input-${TimeInputComponent.nextId++}`;

	constructor(fb: FormBuilder, @Optional() @Self() public ngControl: NgControl) {
		this.time = fb.group({
			hours: ['', [Validators.pattern('^[0-9]*$')]],
			minutes: ['', [Validators.min(0), Validators.max(59), Validators.pattern('^[0-9]*$')]],
		});
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
	}

	ngOnInit() {
		this.time.valueChanges.subscribe((value) => this.onChange(value));
	}

	ngOnDestroy() {
		this.stateChanges.complete();
	}

	get empty() {
		const { hours, minutes } = this.time.value;
		return !hours && !minutes;
	}

	@Input()
	get value(): Time | null {
		console.log(this.time);
		if (this.time.valid) {
			return this.time.value;
		}
		return null;
	}
	set value(time: Time | null) {
		const { hours, minutes } = time || { hours: '', minutes: '' };
		this.time.setValue({ hours, minutes });
		this.stateChanges.next();
	}

	get errorState(): boolean {
		return this.time.invalid && this.time.dirty;
	}

	onChange = (_: any) => {};
	onTouched = () => {};

	onContainerClick(event: MouseEvent): void {}

	setDescribedByIds(ids: string[]): void {}

	writeValue(time: Time | null): void {
		this.value = time;
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	public autoFocusNext(event, input: HTMLElement): void {
		if (event.target.value.toString().length === 2) {
			input.focus();
		}
	}

	public autoFocusPrev(event, input: HTMLElement): void {
		if (event.target.value.toString().length === 0) {
			input.focus();
		}
	}

	public checkTimeConstraints(time: number, timeType: TimeType): void {
		switch (timeType) {
			case TimeType.HOURS:
				this._checkHoursConstraints(time);
				break;
			case TimeType.MINUTES:
				this._checkMinutesConstraints(time);
				break;
			default:
				break;
		}
	}

	private _checkHoursConstraints(hours: number): void {
		if (hours < 0) {
			this.time.patchValue({ hours: 0 });
		}
	}

	private _checkMinutesConstraints(minutes: number): void {
		if (minutes < 0) {
			this.time.patchValue({ minutes: 0 });
		} else if (minutes > 59) {
			this.time.patchValue({ minutes: 59 });
		}
	}
}
