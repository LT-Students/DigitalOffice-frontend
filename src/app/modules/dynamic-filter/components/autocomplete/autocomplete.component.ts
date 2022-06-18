import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Self } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Icons } from '@shared/features/icons/icons';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { InfiniteScrollDataProviderService } from '@app/services/infinite-scroll-data-provider.service';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { AutocompleteFilterParams, Filter } from '../../models';

@Component({
	selector: 'do-filter-autocomplete',
	template: `
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
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [InfiniteScrollDataProviderService],
})
export class AutocompleteComponent implements OnInit, OnDestroy, Filter<AutocompleteFilterParams<any>> {
	public Icons = Icons;

	public searchName$ = new Subject<string>();

	public control = new FormControl('');
	public params!: AutocompleteFilterParams<any>;
	public options$!: Observable<any[]>;
	private destroy$ = new Subject<void>();

	private onChange = () => {};
	private onTouched = () => {};

	constructor(@Self() private infiniteScrollDataProvider: InfiniteScrollDataProviderService<ProjectInfo>) {}

	public ngOnInit(): void {
		this.options$ = this.infiniteScrollDataProvider.getInfiniteDataSource$(
			this.params.loadOptions$,
			this.searchName$.pipe(
				debounceTime(500),
				map((name: string) => ({ nameIncludeSubstring: name }))
			)
		);
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
