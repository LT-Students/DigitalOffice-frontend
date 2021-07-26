import { Component, HostBinding, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';

interface Time {
	hours: number;
	minutes: number;
}

@Component({
	selector: 'do-time-input',
	templateUrl: './time-input.component.html',
	styleUrls: ['./time-input.component.scss'],
	providers: [{ provide: MatFormFieldControl, useExisting: TimeInputComponent }],
})
export class TimeInputComponent implements OnInit, OnDestroy, MatFormFieldControl<Time>, ControlValueAccessor {
	constructor(fb: FormBuilder, @Optional() @Self() public ngControl: NgControl) {
		this.parts = fb.group({
			hours: '',
			minutes: '',
		});
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
	}

	get empty() {
		const { hours, minutes } = this.parts.value;
		return !hours && !minutes;
	}

	@Input()
	get value(): Time | null {
		console.log(this.parts);
		if (this.parts.valid) {
			return this.parts.value;
		}
		return null;
	}
	set value(time: Time | null) {
		const { hours, minutes } = time || { hours: '', minutes: '' };
		this.parts.setValue({ hours, minutes });
		this.stateChanges.next();
	}

	get errorState(): boolean {
		return this.parts.invalid && this.parts.dirty;
	}

	static nextId = 0;

	shouldLabelFloat = true;
	public parts: FormGroup;
	stateChanges = new Subject<void>();
	focused = false;
	controlType = 'time-input';
	disabled = false;
	placeholder: string;
	required: boolean;

	@HostBinding()
	id = `time-input-${TimeInputComponent.nextId++}`;

	onChange = (_: any) => {};
	onTouched = () => {};

	ngOnInit() {
		this.parts.valueChanges.subscribe((value) => this.onChange(value));
	}

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

	autoFocusNext(event, input: HTMLElement): void {
		if (event.target.value.toString().length === 2) {
			input.focus();
		}
	}

	autoFocusPrev(event, input: HTMLElement): void {
		if (event.target.value.toString().length === 0) {
			input.focus();
		}
	}

	ngOnDestroy() {
		this.stateChanges.complete();
	}
}
