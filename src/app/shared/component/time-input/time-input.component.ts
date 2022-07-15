import { Component, OnInit, ChangeDetectionStrategy, Optional, Self, OnDestroy, Input } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'do-time-input',
	template: `
		<input
			#time
			class="input"
			matInput
			type="time"
			[placeholder]="placeholder"
			[formControl]="control"
			(focusin)="focused = true"
			(focusout)="focused = false"
		/>
		<mat-icon class="text-secondary_default" [svgIcon]="Icons.Clock" (click)="time.focus()"></mat-icon>
	`,
	styles: [
		`
			:host {
				display: flex;
				align-items: center;
			}

			.input {
				max-width: fit-content;
			}

			input[type='time']::-webkit-calendar-picker-indicator {
				-webkit-appearance: none;

				display: none;

				background: none;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MatFormFieldControl, useExisting: TimeInputComponent }],
})
export class TimeInputComponent implements OnInit, OnDestroy, ControlValueAccessor, MatFormFieldControl<any> {
	private static uniqueId = 0;
	public readonly Icons = Icons;

	public control = new FormControl(null);
	public readonly stateChanges = new Subject<void>();
	public readonly destroy$ = new Subject<void>();
	public readonly controlType = 'time-input';
	public readonly id = `${this.controlType}-${TimeInputComponent.uniqueId++}`;

	@Input()
	set value(time: string) {
		this.writeValue(time);
		this.stateChanges.next();
	}
	get value(): string {
		return this.control.value;
	}

	@Input()
	set disabled(disabled: any) {
		disabled = coerceBooleanProperty(disabled);
		if (disabled) {
			this.control.disable();
		} else {
			this.control.enable();
		}
		this.stateChanges.next();
	}
	get disabled(): boolean {
		return this.control.disabled;
	}

	public get empty(): boolean {
		return !!this.control.value;
	}

	public get errorState(): boolean {
		return this.control.invalid && this.control.touched;
	}

	public focused = false;

	public readonly placeholder = '00:00';
	public readonly required = false;

	public readonly shouldLabelFloat = false;

	constructor(@Optional() @Self() public ngControl: NgControl) {
		if (ngControl) {
			ngControl.valueAccessor = this;
		}
	}

	public ngOnInit(): void {}

	public ngOnDestroy(): void {
		this.stateChanges.next();
		this.stateChanges.complete();
		this.destroy$.next();
		this.destroy$.complete();
	}

	public onContainerClick(event: MouseEvent): void {}

	public setDescribedByIds(ids: string[]): void {}

	public registerOnChange(fn: any): void {
		this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({ next: fn });
	}

	public registerOnTouched(fn: any): void {}

	public writeValue(time: string): void {
		this.control.setValue(time.split('T')[1], { emitEvent: false });
	}
}
