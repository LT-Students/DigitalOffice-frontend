import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	OnDestroy,
	OnInit,
	Optional,
	Self,
} from '@angular/core';
import { Icons } from '@shared/features/icons/icons';
import {
	AbstractControl,
	ControlValueAccessor,
	FormBuilder,
	FormControl,
	NgControl,
	ValidationErrors,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { ProjectStatusType } from '@api/project-service/models';
import { DateTime } from 'luxon';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProjectStatus } from '../../models/project-status';

function validateDuration(startDateField: string, endDateField: string): ValidatorFn {
	return (group: AbstractControl): ValidationErrors | null => {
		const startDate = group.get(startDateField)?.value as DateTime | null;
		const endDate = group.get(endDateField)?.value as DateTime | null;

		return startDate && endDate && startDate.startOf('day') > endDate.startOf('day')
			? { invalidDuration: true }
			: null;
	};
}

export interface DetailsControlValue {
	status: ProjectStatusType;
	startDate: DateTime;
	endDate?: DateTime;
}

@Component({
	selector: 'do-project-details',
	templateUrl: './project-details.component.html',
	styleUrls: ['./project-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailsComponent implements OnInit, OnDestroy, ControlValueAccessor {
	public readonly Icons = Icons;
	public readonly statuses = ProjectStatus.getAllStatuses();

	@Input() isEditMode = false;

	public form = this.fb.group(
		{
			startDate: [DateTime.now().startOf('day'), Validators.required],
			endDate: [null],
			status: [ProjectStatusType.Active],
		},
		{ validators: validateDuration('startDate', 'endDate') }
	);
	private initialEndDate: DateTime | null = null;

	private get endDateControl(): FormControl {
		return this.form.get('endDate') as FormControl;
	}

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

		this.form
			.get('status')
			?.valueChanges.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: this.handleStatusChange.bind(this),
			});
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
		return { details: true };
	}

	private handleStatusChange(status: ProjectStatusType): void {
		if (status === ProjectStatusType.Active) {
			this.endDateControl.setValue(this.isEditMode ? this.initialEndDate : null);
		} else {
			this.endDateControl.setValidators(Validators.required);
			this.endDateControl.setValue(DateTime.now().startOf('day'));
			this.endDateControl.updateValueAndValidity();
		}
	}

	public registerOnChange(fn: any): void {
		this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({ next: fn });
	}

	public registerOnTouched(fn: any): void {}

	public writeValue(obj: DetailsControlValue | null): void {
		if (obj) {
			this.form.patchValue(obj, { emitEvent: false });
			this.initialEndDate = obj.endDate || null;
		}
	}
}
