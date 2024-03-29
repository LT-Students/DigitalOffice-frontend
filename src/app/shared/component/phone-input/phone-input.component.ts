import { Component, ChangeDetectionStrategy, forwardRef, Optional, Self, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, UntypedFormBuilder, UntypedFormControl, NgControl } from '@angular/forms';
import { CommunicationTypeModel } from '@app/models/communication.model';
import { CommunicationType } from '@api/user-service/models/communication-type';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'do-phone-input',
	templateUrl: './phone-input.component.html',
	styleUrls: ['./phone-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: MatFormFieldControl,
			useExisting: forwardRef(() => PhoneInputComponent),
			multi: true,
		},
	],
})
export class PhoneInputComponent implements MatFormFieldControl<number>, ControlValueAccessor {
	private static _uniqueId = 0;

	public control: UntypedFormControl;

	public get value(): number {
		return this.control.value;
	}

	public stateChanges: Subject<void>;

	@HostBinding()
	public id: string;

	@Input()
	public set placeholder(value: string) {
		this._placeholder = value;
		this.stateChanges.next();
	}

	public get placeholder(): string {
		return this._placeholder;
	}

	private _placeholder: string;

	public focused: boolean;

	public empty: boolean;

	@HostBinding()
	public get shouldLabelFloat(): boolean {
		return true;
	}

	@Input()
	public set required(value: boolean | string) {
		this._required = coerceBooleanProperty(value);
		this.stateChanges.next();
	}

	public get required(): boolean {
		return this._required;
	}

	private _required: boolean;

	@Input()
	public set disabled(value: boolean | string) {
		this._disabled = coerceBooleanProperty(value);
		if (this._disabled) {
			this.control.disable();
		} else {
			this.control.enable();
		}
		this.stateChanges.next();
	}

	public get disabled(): boolean {
		return this._disabled;
	}

	private _disabled: boolean;

	public errorState: boolean;

	public controlType?: string | undefined;

	@HostBinding('attr.aria-describedby')
	public userAriaDescribedBy?: string | undefined;

	constructor(private _fb: UntypedFormBuilder, @Optional() @Self() public ngControl: NgControl | null) {
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
		this.control = this._fb.control('', CommunicationTypeModel.getValidatorsByType(CommunicationType.Phone));
		this._required = false;
		this._disabled = false;
		this.focused = true;
		this.stateChanges = new Subject<void>();
		this._placeholder = '';
		this.id = `custom-phone-input-id-${PhoneInputComponent._uniqueId++}`;
		this.empty = false;
		this.errorState = false;
		this.userAriaDescribedBy = '';
		this.control.valueChanges
			.pipe(
				tap(() => {
					this.errorState = this.control.invalid && this.control.dirty;
				})
			)
			.subscribe((value) => {
				this._onChange(value);
			});
	}

	private _getInputNumbersValue(): string {
		if (['8', '9'].includes(this.control.value[1])) {
			return '+' + this.control.value.replace(/\D/g, '');
		}
		if (this.control.value !== '+') {
			return this.control.value.replace(/\D/g, '');
		} else {
			return '+';
		}
	}

	public onInput(e: Event): void {
		let inputNumbersValue: string = this._getInputNumbersValue();
		let formattedInputValue = '';
		const selectionStart: number | null = (e.target as HTMLInputElement).selectionStart;

		if (!inputNumbersValue) {
			this.control.setValue('');
			return;
		}

		if (this.control.value.length !== selectionStart) {
			return;
		}

		if (['7', '8', '9'].includes(inputNumbersValue[0])) {
			if (inputNumbersValue[0] === '9') {
				inputNumbersValue = '7' + inputNumbersValue;
			}
			const firstSymbols = '+7';
			formattedInputValue = firstSymbols + ' ';
			this.control.setValue(formattedInputValue);

			if (inputNumbersValue.length > 1) {
				formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
			}
			if (inputNumbersValue.length >= 5) {
				formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
			}
			if (inputNumbersValue.length >= 8) {
				formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
			}
			if (inputNumbersValue.length >= 10) {
				formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
			}
		} else {
			if (inputNumbersValue[0] === '+') {
				formattedInputValue = inputNumbersValue.substring(0, 15);
			} else {
				formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
			}
			if (this.control.value.length === 0) {
				formattedInputValue = '';
			}
		}
		this.control.setValue(formattedInputValue);
	}

	public onBackspaceDown(): void {
		if (this._getInputNumbersValue().length === 1) {
			this.control.setValue('');
		}
	}

	public onPaste(e: ClipboardEvent): void {
		const inputNumbersValue: string = this._getInputNumbersValue();
		const pasted: DataTransfer | null = e.clipboardData;
		if (pasted && /\D/g.test(pasted.getData('text'))) {
			this.control.setValue(inputNumbersValue);
		}
	}

	private _onChange(value: any) {}
	private _onTouch() {}

	public registerOnChange(fn: any): void {
		this._onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this._onTouch = fn;
	}

	public setDisabledState(isDisabled: boolean): void {}

	public writeValue(value: string): void {
		this.control.setValue(value);
	}

	public onContainerClick(event: MouseEvent): void {}

	public setDescribedByIds(ids: string[]): void {}
}
