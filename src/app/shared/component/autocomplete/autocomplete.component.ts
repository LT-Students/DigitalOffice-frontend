import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input,
	Self,
	Optional,
	OnDestroy,
	Output,
	EventEmitter,
} from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { MatAutocompleteOrigin } from '@angular/material/autocomplete';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';

@Component({
	selector: 'do-autocomplete',
	template: `
		<div class="container" matAutocompleteOrigin #origin="matAutocompleteOrigin">
			<input
				#search
				matInput
				[placeholder]="placeholder"
				[required]="required"
				[formControl]="searchControl"
				type="text"
				autocomplete="off"
				[matAutocomplete]="auto"
				[matAutocompleteConnectedTo]="parentOrigin || origin"
			/>
			<mat-icon
				class="arrow text-secondary_default"
				[svgIcon]="Icons.ArrowDownV1"
				(click)="search.focus()"
			></mat-icon>
			<mat-autocomplete
				#auto="matAutocomplete"
				[displayWith]="displayWith"
				(optionSelected)="handleOptionSelection($event.option.value)"
				(closed)="handleClose(); search.blur()"
			>
				<ng-container *ngIf="filteredOptions$ | async as filteredOptions">
					<mat-option *ngFor="let option of filteredOptions" [value]="option">{{
						displayWith ? (option | execute: displayWith) : option
					}}</mat-option>
					<mat-option *ngIf="!filteredOptions.length">Не найдено</mat-option>
				</ng-container>
			</mat-autocomplete>
		</div>
	`,
	styles: [
		`
			.container {
				display: flex;
				justify-content: space-between;
			}

			.arrow {
				cursor: pointer;
				height: 22px;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: MatFormFieldControl, useExisting: AutocompleteComponent }],
})
export class AutocompleteComponent<T> implements OnInit, OnDestroy, ControlValueAccessor, MatFormFieldControl<T> {
	private static uniqueId = 0;

	public readonly Icons = Icons;

	@Output() searchChange = new EventEmitter<string>();
	@Output() scrolled = new EventEmitter<IInfiniteScrollEvent>();
	@Input() displayWith: ((value?: T) => string) | null = null;
	@Input() valueGetter: ((value?: T) => any) | null = null;
	@Input() filterFn: ((value: string, options: T[]) => T[]) | null = null;

	@Input()
	set options(options: T[] | null) {
		this._options = options || [];
		this.setInitialSearchValue();
	}
	private _options: T[] = [];

	public filteredOptions$!: Observable<T[]>;

	public searchControl = new FormControl(null);
	public valueControl = new FormControl(null);
	public stateChanges = new Subject<void>();
	public destroy$ = new Subject<void>();

	@Input()
	set value(v: any) {
		this.valueControl.setValue(v);
	}
	get value(): any {
		return this.valueControl.value;
	}

	public controlType = 'do-autocomplete';
	public id = `${this.controlType}-${AutocompleteComponent.uniqueId++}`;
	public focused = false;
	get empty(): boolean {
		return !this.valueControl.value;
	}
	public shouldLabelFloat = false;
	public errorState = false;

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
		if (this._disabled) {
			this.searchControl.disable();
		} else {
			this.searchControl.enable();
		}
		this.stateChanges.next();
	}
	get disabled(): boolean {
		return this._disabled;
	}
	private _disabled = false;

	@Input()
	set required(req: any) {
		this._required = coerceBooleanProperty(req);
		this.stateChanges.next();
	}
	get required(): boolean {
		return this._required;
	}
	private _required = false;

	public parentOrigin?: MatAutocompleteOrigin;

	private onChange = (v: any) => {};
	private onTouched = () => {};

	constructor(@Optional() @Self() public ngControl: NgControl, @Optional() parentFormField: MatFormField) {
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
		this.parentOrigin = parentFormField && new MatAutocompleteOrigin(parentFormField.getConnectedOverlayOrigin());
	}
	setDescribedByIds(ids: string[]): void {}
	onContainerClick(event: MouseEvent): void {}

	public ngOnInit(): void {
		this.filteredOptions$ = this.searchControl.valueChanges.pipe(
			startWith(null),
			map((v: string | object) => {
				if (typeof v === 'string' && this.filterFn) {
					this.valueControl.setValue(null);
					return this.filterFn(v, this._options);
				}
				return this._options;
			})
		);

		this.valueControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({ next: this.onChange });
	}

	public ngOnDestroy(): void {
		this.stateChanges.next();
		this.stateChanges.complete();
		this.destroy$.next();
		this.destroy$.complete();
	}

	public handleOptionSelection(value: T): void {
		const newValue = this.valueGetter ? this.valueGetter(value) : value;
		this.valueControl.setValue(newValue);
	}

	public handleClose(): void {
		if (!this.value) {
			this.searchControl.setValue(null);
		}
	}

	private setInitialSearchValue(): void {
		const initialValue = this._options.find((o: T) => this.value === this.valueGetter?.call(this, o));
		this.searchControl.setValue(initialValue);
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	public writeValue(value: any): void {
		this.valueControl.setValue(value, { emitEvent: false });
		this.setInitialSearchValue();
	}
}
