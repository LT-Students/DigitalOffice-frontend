import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Self, Optional,
} from '@angular/core';
import {
	ControlValueAccessor,
	FormControl,
	FormGroupDirective,
	NgControl,
	NgForm, Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

class PasswordFieldErrorMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
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

	@Input() disabled: boolean | undefined;
	@Input() placeholder = '';
	@Input() errors: any = null;
	hide = true;

	public value: any;

	public repeatPasswordErrorMatcher = new PasswordFieldErrorMatcher();
	control = new FormControl(null, [ Validators.required ]);
	onChange: any = () => {
	};
	onTouched: any = () => {
	};

	constructor(@Optional() @Self() public ngControl: NgControl) {
		if (this.ngControl) {
			this.ngControl.valueAccessor = this;
		}
		this.control.valueChanges.subscribe((value) => {
			this.setValue(value);
		})
	}

	writeValue(value: any): void {
		this.control.setValue(value);
	}

	registerOnChange(fn: () => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	setValue(value: string) {
		this.onChange(value);
	}
}
