import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	OnDestroy,
	Optional,
	Self,
	ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, NgControl, ValidationErrors } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DoValidators } from '@app/validators/do-validators';

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
export class ProjectDescriptionFormComponent implements OnInit, OnDestroy, ControlValueAccessor {
	public form = this.fb.group({
		shortDescription: ['', [DoValidators.matchMaxLength(100)]],
		description: [''],
	});
	private destroy$ = new Subject<void>();

	constructor(
		private fb: FormBuilder,
		@Optional() @Self() private ngControl: NgControl,
		private cdr: ChangeDetectorRef
	) {
		if (ngControl) {
			ngControl.valueAccessor = this;
		}
	}

	public ngOnInit(): void {
		const control = this.ngControl.control;
		control?.setValidators([this.validate.bind(this)]);
		control?.updateValueAndValidity();
		this.registerMarkAsTouched();
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private registerMarkAsTouched(): void {
		const control = this.ngControl.control;
		if (control) {
			control.markAsTouched = () => {
				this.form.markAllAsTouched();
				this.cdr.markForCheck();
			};
		}
	}

	public validate(): ValidationErrors | null {
		if (this.form.valid) {
			return null;
		}
		return { description: true };
	}

	public registerOnChange(fn: any): void {
		this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({ next: fn });
		this.form.updateValueAndValidity();
	}

	public registerOnTouched(fn: any): void {}

	public writeValue(obj: DescriptionControlValue | null): void {
		if (obj) {
			this.form.patchValue(obj, { emitEvent: false });
		}
	}
}
