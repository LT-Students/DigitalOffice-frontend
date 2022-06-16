import { Component, OnInit, ChangeDetectionStrategy, Input, Self, Optional, OnDestroy } from '@angular/core';
import { Icons } from '@shared/features/icons/icons';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { takeUntil } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
	selector: 'do-autocomplete',
	template: `
		<do-form-row>
			<mat-form-field>
				<input
					#search
					matInput
					[placeholder]="placeholder"
					[disabled]="disabled"
					[required]="required"
					[formControl]="searchControl"
					type="text"
					autocomplete="off"
					[matAutocomplete]="auto"
				/>
				<mat-icon class="arrow text-secondary_default" matSuffix [svgIcon]="Icons.ArrowDownV1"></mat-icon>
				<mat-autocomplete
					#auto="matAutocomplete"
					[displayWith]="displayWith"
					(optionSelected)="handleOptionSelection($event)"
					(opened)="handlePanelOpen()"
					(closed)="handlePanelClose(); search.blur()"
				>
					<mat-option *ngFor="let option of options" [value]="option | execute: optionValueGetter">
						{{ option | execute: optionDisplayValueGetter }}
					</mat-option>
				</mat-autocomplete>
			</mat-form-field>
		</do-form-row>
	`,
	styles: [
		`
			.arrow {
				cursor: pointer;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor {
	public readonly Icons = Icons;

	@Input() options: any[] = [];
	@Input() displayWith: ((value: any) => string) | null = null;

	public searchControl = new FormControl(null);
	public valueControl = new FormControl(null);
	public wasOptionSelected = false;
	public hasSearchChanged = false;
	public destroy$ = new Subject<void>();

	@Input()
	set placeholder(p: any) {
		this._placeholder = String(p);
	}
	get placeholder(): string {
		return this._placeholder;
	}
	private _placeholder = '';

	@Input()
	set disabled(d: any) {
		this._disabled = coerceBooleanProperty(d);
		this.destroy$.next();
	}
	get disabled(): boolean {
		return this._disabled;
	}
	private _disabled = false;

	@Input()
	set required(req: any) {
		this._required = coerceBooleanProperty(req);
		this.destroy$.next();
	}
	get required(): boolean {
		return this._required;
	}
	private _required = false;

	@Input() optionValueGetter: (value: any) => any = (value: any) => value;
	@Input() optionDisplayValueGetter: (value: any) => any = (value: any) => value;

	private onChange = () => {};
	private onTouched = () => {};

	constructor(@Optional() @Self() public ngControl: NgControl) {
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
	}

	public ngOnInit(): void {
		this.searchControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
			this.hasSearchChanged = true;
			// FETCH NEW DATA
		});
		this.valueControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v: any) => {
			console.log(v);
			this.onChange();
		});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public handleOptionSelection(event: MatAutocompleteSelectedEvent): void {
		const value = event.option.value;
		this.valueControl.setValue(value);
		this.wasOptionSelected = true;
	}

	public handlePanelOpen(): void {
		this.hasSearchChanged = false;
	}

	public handlePanelClose(): void {
		if (!this.wasOptionSelected && this.hasSearchChanged) {
			this.valueControl.setValue(null);
			this.searchControl.setValue('');
		}
		this.wasOptionSelected = false;
		this.hasSearchChanged = false;
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	public writeValue(value: any): void {
		this.searchControl.setValue(value);
	}
}
