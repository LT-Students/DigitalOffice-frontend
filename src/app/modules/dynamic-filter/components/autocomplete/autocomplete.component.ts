import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { Icons } from '@shared/features/icons/icons';
import { debounceTime, filter, first, map, scan, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { Filter } from '../../models/filter';
import { AutocompleteFilterParams } from './autocomplete';

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
})
export class AutocompleteComponent implements OnInit, OnDestroy, Filter<AutocompleteFilterParams<any>> {
	public Icons = Icons;

	private readonly takeCount = 30;
	private totalCount = Number.MAX_VALUE;
	public skipCount$ = new BehaviorSubject<number>(0);
	public searchName$ = new BehaviorSubject<string>('');

	public control = new FormControl('');
	public params!: AutocompleteFilterParams<any>;
	public options$!: Observable<any[]>;
	private destroy$ = new Subject<void>();

	private onChange = () => {};
	private onTouched = () => {};

	constructor() {}

	public ngOnInit(): void {
		this.options$ = this.loadOptions$();
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
		this.skipCount$.pipe(first()).subscribe({
			next: (offset: number) => this.skipCount$.next(offset + this.takeCount),
		});
	}

	private loadOptions$(): Observable<any[]> {
		return combineLatest([
			this.searchName$.pipe(
				debounceTime(500),
				tap(() => this.skipCount$.next(0))
			),
			this.skipCount$.pipe(filter((offset: number) => offset < this.totalCount)),
		]).pipe(
			switchMap(([name, skipCount]: [string, number]) =>
				this.params.loadOptions$({
					skipCount: skipCount,
					takeCount: this.takeCount,
					...(name && { nameIncludeSubstring: name }),
				})
			),
			tap((res: OperationResultResponse) => (this.totalCount = res.totalCount || 0)),
			map((res: OperationResultResponse) => res.body as any[]),
			withLatestFrom(this.skipCount$),
			scan((acc: any[], [values, skipCount]: [any[], number]) => (skipCount ? [...acc, ...values] : values), []),
			takeUntil(this.destroy$)
		);
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
