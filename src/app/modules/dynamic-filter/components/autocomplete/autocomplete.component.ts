import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { InfiniteScrollDataProvider } from '@app/utils/infinite-scroll-data-provider';
import { AutocompleteFilterParams, Filter } from '../../models';

@Component({
	selector: 'do-filter-autocomplete',
	template: `
		<do-form-field>
			<mat-form-field>
				<do-autocomplete
					[placeholder]="params?.placeholder"
					[formControl]="control"
					[displayWith]="params.displayWithFn || null"
					(scrolled)="handleScroll()"
					(searchChange)="searchName$.next($event)"
				>
					<do-option *ngFor="let option of options$ | async" [value]="option">
						{{ option | execute: params.displayValueGetter }}
					</do-option>
				</do-autocomplete>
			</mat-form-field>
		</do-form-field>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit, OnDestroy, Filter<AutocompleteFilterParams<any>> {
	public searchName$ = new Subject<string>();

	public dataProvider!: InfiniteScrollDataProvider<any>;
	public control = new FormControl(null);
	public params!: AutocompleteFilterParams<any>;
	public options$!: Observable<any[]>;
	private destroy$ = new Subject<void>();

	private onChange = () => {};
	private onTouched = () => {};

	constructor() {}

	public ngOnInit(): void {
		this.dataProvider = new InfiniteScrollDataProvider(
			this.params.loadOptions$,
			this.searchName$.pipe(
				debounceTime(500),
				map((name: string) => ({ nameIncludeSubstring: name || null }))
			)
		);
		this.options$ = this.dataProvider.dataSource$;

		this.control.valueChanges
			.pipe(
				map((v: any) => this.params.valueGetter(v)),
				takeUntil(this.destroy$)
			)
			.subscribe({ next: this.onChange });
	}

	public ngOnDestroy(): void {
		this.destroy$.unsubscribe();
	}

	public handleScroll(): void {
		this.dataProvider.loadOnScroll();
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	public writeValue(value: any): void {
		this.control.setValue(value);
	}
}
