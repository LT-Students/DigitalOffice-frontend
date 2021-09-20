import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Self, Optional, forwardRef,
} from '@angular/core';
import {
	ControlValueAccessor,
	FormControl, FormGroup,
	FormGroupDirective, NG_VALIDATORS, NG_VALUE_ACCESSOR,
	NgControl,
	NgForm, ValidatorFn, Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

class PasswordFieldErrorMatcher implements ErrorStateMatcher {
	public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
		const invalidParent = !!(form?.invalid && form?.dirty);

		return invalidCtrl || invalidParent;
	}
}

@Component({
	selector: 'do-password',
	templateUrl: './password.component.html',
	styleUrls: ['./password.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordComponent implements ControlValueAccessor {

	@Input() public disabled: boolean;
	@Input() public placeholder: string;
	public hide: boolean;

	public repeatPasswordErrorMatcher = new PasswordFieldErrorMatcher();
	control = new FormControl(null, [ Validators.required ]);
	public onChange: (value: string) => void;
	public onTouched: () => void;

	constructor(@Optional() @Self() public ngControl: NgControl, public formGroupDirective: FormGroupDirective) {
		if (this.ngControl) {
			this.ngControl.valueAccessor = this;
		}
		this.control.valueChanges.subscribe((value) => {
			this.setValue(value);
		});
		this.disabled = true;
		this.placeholder = '';
		this.hide = true;
		this.onChange = () => {};
		this.onTouched = () => {};
	}

	public writeValue(value: any): void {
		this.control.setValue(value);
	}

	public registerOnChange(fn: () => void): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	public setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	public setValue(value: string) {
		this.onChange(value);
	}
}
