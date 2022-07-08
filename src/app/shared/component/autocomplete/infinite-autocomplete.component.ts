import { Component, OnInit, ChangeDetectionStrategy, Self, OnDestroy, Input, Optional } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { InfiniteScrollDataProviderService } from '@app/services/infinite-scroll-data-provider.service';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';

@Component({
	selector: 'do-infinite-autocomplete',
	template: `
		<do-autocomplete
			[placeholder]="placeholder"
			[formControl]="control"
			[displayWith]="displayWithFn || null"
			(scrolled)="handleScroll()"
			(searchChange)="searchName$.next($event)"
		>
			<do-option *ngFor="let option of options$ | async" [value]="option">
				{{ option | execute: displayValueGetter }}
			</do-option>
		</do-autocomplete>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [InfiniteScrollDataProviderService],
})
export class InfiniteAutocompleteComponent<T> implements OnInit, OnDestroy, ControlValueAccessor {
	@Input()
	set placeholder(p: any) {
		this._placeholder = String(p);
	}
	get placeholder(): string {
		return this._placeholder;
	}
	private _placeholder = '';

	@Input() loadOptions$!: (params: {
		takeCount: number;
		skipCount: number;
		nameIncludeSubstring?: string;
	}) => Observable<OperationResultResponse<T[]>>;
	@Input() displayWithFn?: (o?: T) => string;
	@Input() displayValueGetter!: (o: T) => any;
	@Input() valueGetter!: (o?: T) => any;

	public searchName$ = new Subject<string>();

	public control = new FormControl('');
	public options$!: Observable<any[]>;
	private destroy$ = new Subject<void>();

	private onChange = () => {};
	private onTouched = () => {};

	constructor(
		@Self() private infiniteScrollDataProvider: InfiniteScrollDataProviderService<T>,
		@Optional() @Self() ngControl: NgControl
	) {
		if (ngControl) {
			ngControl.valueAccessor = this;
		}
	}

	public ngOnInit(): void {
		this.options$ = this.infiniteScrollDataProvider.getInfiniteDataSource$(
			this.loadOptions$,
			this.searchName$.pipe(
				debounceTime(500),
				map((name: string) => ({ nameIncludeSubstring: name }))
			)
		);
		this.control.valueChanges
			.pipe(
				map((v: any) => this.valueGetter(v)),
				takeUntil(this.destroy$)
			)
			.subscribe({ next: this.onChange });
	}

	public ngOnDestroy(): void {
		this.destroy$.unsubscribe();
	}

	public handleScroll(): void {
		this.infiniteScrollDataProvider.loadOnScroll();
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	public writeValue(value: string): void {
		this.control.setValue(value);
	}
}
