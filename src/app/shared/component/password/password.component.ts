import {
	Component,
	ChangeDetectionStrategy,
	Input,
	Self,
	Optional,
	OnDestroy,
	HostBinding,
	OnInit,
	ElementRef,
} from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, FormGroupDirective, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
	selector: 'do-password',
	templateUrl: './password.component.html',
	styleUrls: ['./password.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MatFormFieldControl, useExisting: PasswordComponent }],
})
export class PasswordComponent implements OnInit, OnDestroy, ControlValueAccessor, MatFormFieldControl<string> {
	private static nextId = 0;

	readonly controlType = 'password-input';
	readonly stateChanges = new Subject<void>();
	public hide = true;
	public focused = false;
	public touched = false;
	public control = new UntypedFormControl(null);

	@Input() errorStateMatcher?: ErrorStateMatcher;

	@Input()
	set value(v: string) {
		this.control.setValue(v);
		this.stateChanges.next();
	}
	get value(): string {
		return this.control.value;
	}

	@Input() name = `pwd-input-${PasswordComponent.nextId}`;

	@Input()
	set placeholder(v: string) {
		this._placeholder = v;
		this.stateChanges.next();
	}
	get placeholder(): string {
		return this._placeholder;
	}
	private _placeholder = '';
	@Input()
	get disabled(): boolean {
		return this._disabled;
	}
	set disabled(value: any) {
		this._disabled = coerceBooleanProperty(value);
		if (this._disabled) {
			this.control.disable();
		} else {
			this.control.enable();
		}
		this.stateChanges.next();
	}
	private _disabled = false;

	@Input()
	get required(): boolean {
		return this._required;
	}
	set required(req: any) {
		this._required = coerceBooleanProperty(req);
		this.stateChanges.next();
	}
	private _required = false;

	get empty(): boolean {
		return !this.control.value;
	}
	get errorState(): boolean {
		const matcher = this.errorStateMatcher ?? this.errorMatcher;
		return matcher.isErrorState(this.ngControl.control as UntypedFormControl, this.form);
	}

	@HostBinding()
	readonly id: string = `password-input-${PasswordComponent.nextId++}`;

	@HostBinding('class.floating')
	get shouldLabelFloat() {
		return this.focused || !this.empty;
	}

	public onChange: (value: string) => void = () => {};
	public onTouched: () => void = () => {};

	constructor(
		@Optional() @Self() public ngControl: NgControl,
		private _elementRef: ElementRef<HTMLElement>,
		private errorMatcher: ErrorStateMatcher,
		private form: FormGroupDirective
	) {
		if (this.ngControl) {
			this.ngControl.valueAccessor = this;
		}
	}

	public ngOnInit() {
		this.control.valueChanges.subscribe((value) => {
			this.setValue(value);
		});
	}

	public onFocusIn(event: FocusEvent): void {
		if (!this.focused) {
			this.focused = true;
			this.stateChanges.next();
		}
	}

	public onFocusOut(event: FocusEvent): void {
		if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
			this.touched = true;
			this.focused = false;
			this.onTouched();
			this.stateChanges.next();
		}
	}

	public setDescribedByIds(ids: string[]): void {}

	onContainerClick(event: MouseEvent): void {}

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

	public ngOnDestroy() {
		this.stateChanges.next();
		this.stateChanges.complete();
	}
}
