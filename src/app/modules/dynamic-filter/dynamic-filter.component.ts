import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FilterDef } from './models/filter-def';

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
	@Input() filters: FilterDef[] = [];
	public form!: FormGroup;
	private filterSubscription!: Subscription;

	constructor(private fb: FormBuilder) {}

	public ngOnInit(): void {
		const group = this.filters.reduce(
			(acc: object, filter: FilterDef) => ({ ...acc, [filter.key]: [filter.initialValue] }),
			{}
		);
		this.form = this.fb.group(group);

		this.filterSubscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
			next: (value: FilterEvent) => {
				Object.keys(value).forEach((k: string) => {
					if (value[k] == null || value[k] === '') {
						value[k] = undefined;
					}
				});
				this.filterChange.emit(value);
			},
		});
	}

	public ngOnDestroy(): void {
		this.filterSubscription.unsubscribe();
	}
}
