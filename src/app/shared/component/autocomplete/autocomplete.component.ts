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
	ContentChildren,
	QueryList,
} from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MatAutocompleteOrigin, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { OptionComponent } from '@shared/component/option/option.component';
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
				(blur)="handleBlur()"
			/>
			<mat-icon
				class="arrow text-secondary_default"
				[svgIcon]="Icons.ArrowDownV1"
				(click)="search.focus()"
			></mat-icon>
			<mat-autocomplete
				#auto="matAutocomplete"
				infiniteScroll
				[infiniteScrollContainer]="auto?.panel?.nativeElement ?? ''"
				[infiniteScrollThrottle]="0"
				[alwaysCallback]="true"
				(scrolled)="scrolled.emit($event)"
				[displayWith]="displayWith"
				(optionSelected)="handleOptionSelection($event)"
				(opened)="handlePanelOpen()"
				(closed)="handlePanelClose(); search.blur()"
			>
				<mat-option *ngFor="let option of options.changes | async" [value]="option.value">
					<ng-container *ngTemplateOutlet="option.template"></ng-container>
				</mat-option>
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
export class AutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor, MatFormFieldControl<any> {
	private static uniqueId = 0;

	public readonly Icons = Icons;
	@ContentChildren(OptionComponent) options!: QueryList<OptionComponent>;

	@Output() searchChange = new EventEmitter<string>();
	@Output() scrolled = new EventEmitter<IInfiniteScrollEvent>();
	@Input() displayWith: ((value: any) => string) | null = null;

	public searchControl = new FormControl(null);
	public valueControl = new FormControl(null);
	public wasOptionSelected = false;
	public hasSearchChanged = false;
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

	constructor(@Optional() @Self() public ngControl: NgControl, @Optional() private parentFormField: MatFormField) {
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
		this.parentOrigin = new MatAutocompleteOrigin(parentFormField.getConnectedOverlayOrigin());
	}
	setDescribedByIds(ids: string[]): void {}
	onContainerClick(event: MouseEvent): void {}

	public ngOnInit(): void {
		this.searchControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v: object | string) => {
			if (typeof v === 'string') {
				this.hasSearchChanged = true;
				this.searchChange.emit(v);
				this.valueControl.setValue(null, { emitEvent: false });
			}
		});
		this.valueControl.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(this.onChange);
	}

	public ngOnDestroy(): void {
		this.stateChanges.next();
		this.stateChanges.complete();
		this.destroy$.next();
		this.destroy$.complete();
	}

	public handleBlur(): void {
		this.onTouched();
		if (!this.valueControl.value) {
			this.searchControl.setValue('');
		}
		this.errorState = !!this.ngControl.invalid && !!this.ngControl.touched;
		this.stateChanges.next();
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
			this.searchControl.setValue(null);
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
		this.searchControl.setValue(value, { emitEvent: false });
		this.valueControl.setValue(value, { emitEvent: false });
	}
}
