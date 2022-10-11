import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FilterDef } from './models';

export interface FilterEvent {
	[key: string]: any;
}

@Component({
	selector: 'do-dynamic-filter',
	templateUrl: './dynamic-filter.component.html',
	styleUrls: ['./dynamic-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFilterComponent implements OnInit, OnDestroy {
	@Output() filterChange = new EventEmitter<FilterEvent>();

	@Input()
	set filters(filters: FilterDef[] | null) {
		this._filters = filters || this._filters;
	}
	get filters(): FilterDef[] {
		return this._filters;
	}
	private _filters: FilterDef[] = [];

	public form!: UntypedFormGroup;
	private filterSubscription!: Subscription;

	public get value(): FilterEvent {
		return this.filterBlankProps(this.form.getRawValue());
	}

	constructor(private fb: UntypedFormBuilder) {}

	public ngOnInit(): void {
		const group = this.filters.reduce(
			(acc: object, filter: FilterDef) => ({ ...acc, [filter.key]: [filter.initialValue] }),
			{}
		);
		this.form = this.fb.group(group);

		this.filterSubscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
			next: (value: FilterEvent) => {
				value = this.filterBlankProps(value);
				this.filterChange.emit(value);
			},
		});
	}

	public ngOnDestroy(): void {
		this.filterSubscription.unsubscribe();
	}

	private filterBlankProps(value: FilterEvent): FilterEvent {
		Object.keys(value).forEach((k: string) => {
			if (value[k] == null || value[k] === '') {
				value[k] = undefined;
			}
		});
		return value;
	}
}
