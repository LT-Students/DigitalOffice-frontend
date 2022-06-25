import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NgControl, ValidationErrors } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ErrorAccessor } from '../../models/error-accessor';

export interface DescriptionControlValue {
	description?: string;
	shortDescription?: string;
}

@Component({
	selector: 'do-project-description-form',
	templateUrl: './project-description-form.component.html',
	styleUrls: ['./project-description-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDescriptionFormComponent extends ErrorAccessor implements OnInit, OnDestroy, ControlValueAccessor {
	public readonly MAX_LENGTH_SHORT_DESCRIPTION = 100;

	public form = this.fb.group({
		shortDescription: [''],
		description: [''],
	});
	private destroy$ = new Subject<void>();

	constructor(private fb: FormBuilder, @Optional() @Self() private ngControl: NgControl) {
		super();
		if (ngControl) {
			ngControl.valueAccessor = this;
		}
	}

	public ngOnInit(): void {
		const control = this.ngControl.control;
		control?.setValidators([this.validate.bind(this)]);
		control?.updateValueAndValidity();
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public validate(): ValidationErrors | null {
		if (this.form.valid) {
			return null;
		}
		return this.getControlErrors(this.form);
	}

	public registerOnChange(fn: any): void {
		this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({ next: fn });
	}

	public registerOnTouched(fn: any): void {}

	public writeValue(obj: DescriptionControlValue | null): void {
		if (obj) {
			this.form.patchValue(obj, { emitEvent: false });
		}
	}
}
