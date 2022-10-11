import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataSourceFilterBase } from '@app/types/do-table-data-source';
import { Icons } from '@shared/modules/icons/icons';
import { UntypedFormBuilder } from '@angular/forms';
import { AutocompleteConfigsService } from '@shared/component/autocomplete/autocomplete-configs.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FilterEvent } from '../../../../../dynamic-filter/dynamic-filter.component';

@Component({
	selector: 'do-transfer-filter',
	templateUrl: './transfer-filter.component.html',
	styleUrls: ['./transfer-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('filterExpanded', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*', marginTop: '16px' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class TransferFilterComponent implements OnInit, OnDestroy, DataSourceFilterBase {
	public readonly Icons = Icons;
	@Output() filterChange = new EventEmitter<FilterEvent>();

	get value(): FilterEvent {
		return this.form.value;
	}

	public departmentAutocompleteConfig = this.autocompleteConfigs.getDepartmentsConfig();
	public additionalFiltersAreHidden = true;
	public form = this.fb.group({
		name: [''],
		department: [null],
	});

	private subscription!: Subscription;

	constructor(private fb: UntypedFormBuilder, private autocompleteConfigs: AutocompleteConfigsService) {}

	public ngOnInit(): void {
		this.subscription = this.form.valueChanges.pipe(debounceTime(300)).subscribe({
			next: (v: any) => this.filterChange.emit(v),
		});
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
