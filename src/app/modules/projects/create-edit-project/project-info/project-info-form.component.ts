import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	OnDestroy,
	Input,
	Optional,
	Self,
	ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, UntypedFormBuilder, NgControl, ValidationErrors } from '@angular/forms';
import { DepartmentInfo as ProjectDepartmentInfo } from '@api/project-service/models/department-info';
import { DepartmentService } from '@app/services/department/department.service';
import { Subject } from 'rxjs';
import { DoValidators } from '@app/validators/do-validators';
import { takeUntil } from 'rxjs/operators';
import { Icons } from '@shared/modules/icons/icons';
import { AutocompleteConfigsService } from '@shared/component/autocomplete/autocomplete-configs.service';

export interface InfoControlValue {
	name: string;
	shortName: string;
	customer?: string;
	department?: string | ProjectDepartmentInfo;
}

@Component({
	selector: 'do-project-info-form',
	templateUrl: './project-info-form.component.html',
	styleUrls: ['./project-info-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectInfoFormComponent implements OnInit, OnDestroy, ControlValueAccessor {
	public readonly Icons = Icons;

	@Input() isEditMode = false;

	public form = this.fb.group({
		name: [null, [DoValidators.required, DoValidators.matchMaxLength(150)]],
		shortName: [null, [DoValidators.required, DoValidators.matchMaxLength(40)]],
		customer: [null, [DoValidators.matchMaxLength(150)]],
		department: [null],
	});

	private destroy$ = new Subject<void>();

	public departmentAutocompleteConfig = this.autocompleteConfigs.getDepartmentsConfig();

	constructor(
		private fb: UntypedFormBuilder,
		private departmentService: DepartmentService,
		@Optional() @Self() private ngControl: NgControl,
		private cdr: ChangeDetectorRef,
		private autocompleteConfigs: AutocompleteConfigsService
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
		return { info: true };
	}

	public registerOnChange(fn: any): void {
		this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
			next: fn,
		});
	}

	public registerOnTouched(fn: any): void {}

	public writeValue(obj: InfoControlValue | null): void {
		if (obj) {
			this.form.patchValue(obj, { emitEvent: false });
		}
	}
}
