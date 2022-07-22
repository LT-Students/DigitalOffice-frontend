import { Observable } from 'rxjs';
import { AutocompleteConfig } from '@shared/component/autocomplete/autocomplete-configs.service';

interface IAutocompleteFilterParams<T> extends AutocompleteConfig<T> {
	placeholder?: string;
}

export class AutocompleteFilterParams<T> {
	public options$: Observable<T[]>;
	public valueGetter: (o?: T) => any;
	public displayWithFn: (o?: T) => string;
	public filterFn: (filterValue: string, options: T[]) => T[];
	public placeholder?: string;

	constructor(params: IAutocompleteFilterParams<T>) {
		this.options$ = params.options$;
		this.valueGetter = params.valueGetter;
		this.displayWithFn = params.displayWithFn;
		this.filterFn = params.filterFn;
		this.placeholder = params.placeholder;
	}
}
