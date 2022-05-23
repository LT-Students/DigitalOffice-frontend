import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input,
	HostBinding,
	Optional,
	Self,
	Output,
	EventEmitter,
	ChangeDetectorRef,
	OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, Validators } from '@angular/forms';
import { DoValidators } from '@app/validators/do-validators';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class EmailValue {
	checked: boolean;
	email: string;
	communicationId?: string;

	constructor(email: string, communicationId?: string) {
		this.email = email;
		this.communicationId = communicationId;
		this.checked = false;
	}
}

@Component({
	selector: 'do-email-item',
	templateUrl: './email-item.component.html',
	styleUrls: ['./email-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailItemComponent implements OnInit, OnDestroy, ControlValueAccessor {
	public static uniqueId = 0;

	@Input() canEdit = false;
	@Output() delete = new EventEmitter<void>();
	@Output() emailChange = new EventEmitter<void>();
	public value!: EmailValue;
	public isEditMode = false;
	public emailControl = new FormControl('', [Validators.required, DoValidators.email]);

	private destroy$ = new Subject<void>();

	@HostBinding('attr.data-test')
	private readonly id = `email-${EmailItemComponent.uniqueId++}`;

	constructor(@Optional() @Self() public ngControl: NgControl, private cdr: ChangeDetectorRef) {
		if (this.ngControl) {
			this.ngControl.valueAccessor = this;
		}
	}

	public ngOnInit(): void {
		this.isEditMode = this.value.email === '';
		this.ngControl.control?.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
			if (this.ngControl.hasError('emailExists')) {
				this.cdr.markForCheck();
			}
		});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public handleCheck(): void {
		this.value.checked = !this.value.checked;
		this.onChange(this.value);
		this.emailChange.emit();
	}

	public editEmail(): void {
		if (this.emailControl.invalid) {
			this.emailControl.markAsTouched();
			return;
		}
		this.isEditMode = false;
		this.writeValue(new EmailValue(this.emailControl.value));
		this.onChange(this.value);
	}

	public cancelEdit(): void {
		if (this.value.email === '') {
			this.delete.emit();
			return;
		}
		this.emailControl.reset(this.value.email);
		this.isEditMode = false;
	}

	private onChange(v: any): void {}

	public writeValue(v: EmailValue): void {
		this.value = v;
		this.cdr.markForCheck();
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {}
}
