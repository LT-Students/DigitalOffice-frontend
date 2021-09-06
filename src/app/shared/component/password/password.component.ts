import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Injector, Input, AfterViewInit } from '@angular/core';
import {
	ControlValueAccessor,
	FormControl,
	FormGroupDirective,
	NG_VALUE_ACCESSOR,
	NgControl,
	NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

class PasswordFieldErrorMatcher implements ErrorStateMatcher {
	constructor(private customControl: FormControl | undefined, private errors: any) { }
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {


		return this.customControl && this.customControl.touched && (this.customControl.invalid || this.errors);
	}
}

@Component({
  selector: 'do-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: forwardRef(() => PasswordComponent),
		}
	]
})
export class PasswordComponent implements OnInit, AfterViewInit, ControlValueAccessor {

	value: any;
	@Input() disabled: boolean | undefined;
	@Input() placeholder = '';
	@Input() errors: any = null;
	hide = true;


	control: FormControl | undefined;
	onChange: any = () => { };
	onTouched: any = () => { };

	constructor (public injector: Injector) { }

	errorMatcher() {
		return new PasswordFieldErrorMatcher(this.control, this.errors)
	}


  ngOnInit(): void {
  }

	ngAfterViewInit(): void {
		const ngControl: NgControl = this.injector.get(NgControl, undefined);
		if (ngControl) {
			setTimeout(() => {
				this.control = ngControl.control as FormControl;
			})
		}
	}

	writeValue(value: any): void {
		this.control?.setValue(value);
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

	setValue() {
		this.hide = !this.hide;
		this.onChange(this.value);
	}

}
