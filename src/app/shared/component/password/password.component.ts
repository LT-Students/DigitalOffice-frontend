import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Self, Optional,
} from '@angular/core';
import {
	ControlValueAccessor,
	FormControl, FormGroupDirective,
	NgControl,
	NgForm, Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

class PasswordFieldErrorMatcher implements ErrorStateMatcher {
	public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
		const invalidParent = !!(form?.invalid && form?.errors?.matchingPasswords);

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

	public repeatPasswordErrorMatcher: PasswordFieldErrorMatcher;
	public control: FormControl;
	public onChange: (value: string) => void;
	public onTouched: () => void;

	constructor(@Optional() @Self() public ngControl: NgControl, public formGroupDirective: FormGroupDirective) {
		if (this.ngControl) {
			this.ngControl.valueAccessor = this;
		}
		this.disabled = true;
		this.placeholder = '';
		this.hide = true;
		this.onChange = () => {};
		this.onTouched = () => {};
		this.control = new FormControl(null, [ Validators.required ]);
		this.control.valueChanges.subscribe((value) => {
			this.setValue(value);
		});
		this.repeatPasswordErrorMatcher = new PasswordFieldErrorMatcher();
	}

	public writeValue(value: string): void {
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

	public setValue(value: string): void {
		this.onChange(value);
	}
}
