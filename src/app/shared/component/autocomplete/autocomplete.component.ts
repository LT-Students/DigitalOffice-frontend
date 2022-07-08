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
import { takeUntil } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { OptionComponent } from '@shared/component/option/option.component';

@Component({
	selector: 'do-autocomplete',
	template: `
		<mat-form-field class="form-field">
			<input
				#search
				matInput
				[placeholder]="placeholder"
				[required]="required"
				[formControl]="searchControl"
				type="text"
				autocomplete="off"
				[matAutocomplete]="auto"
			/>
			<mat-icon class="arrow text-secondary_default" matSuffix [svgIcon]="Icons.ArrowDownV1"></mat-icon>
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
		</mat-form-field>
	`,
	styles: [
		`
			.form-field {
				width: 100%;
			}
			.arrow {
				cursor: pointer;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor {
	public readonly Icons = Icons;
	@ContentChildren(OptionComponent) options!: QueryList<OptionComponent>;

	@Output() searchChange = new EventEmitter<string>();
	@Output() scrolled = new EventEmitter<IInfiniteScrollEvent>();
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
		if (this._disabled) {
			this.searchControl.disable();
		} else {
			this.searchControl.enable();
		}
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

	private onChange = () => {};
	private onTouched = () => {};

	constructor(@Optional() @Self() public ngControl: NgControl) {
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
	}

	public ngOnInit(): void {
		this.searchControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v: object | string) => {
			if (typeof v === 'string') {
				this.hasSearchChanged = true;
				this.searchChange.emit(v);
			}
		});
		this.valueControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(this.onChange);
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
	}
}
