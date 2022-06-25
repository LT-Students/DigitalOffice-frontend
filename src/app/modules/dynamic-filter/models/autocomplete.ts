import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';

interface IAutocompleteFilterParams<T> {
	loadOptions$: (params: {
		takeCount: number;
		skipCount: number;
		nameIncludeSubstring?: string;
	}) => Observable<OperationResultResponse<T[]>>;
	valueGetter: (o: T | null) => any;
	displayValueGetter: (o: T) => any;
	displayWithFn?: (o: T | null) => string;
	placeholder?: string;
}

export class AutocompleteFilterParams<T> implements IAutocompleteFilterParams<T> {
	public loadOptions$: (params: {
		takeCount: number;
		skipCount: number;
		nameIncludeSubstring?: string;
	}) => Observable<OperationResultResponse<T[]>>;
	public valueGetter: (o: T | null) => any;
	public displayValueGetter: (o: T) => any;
	public displayWithFn?: (o: T | null) => string;
	public placeholder?: string;

	constructor(params: IAutocompleteFilterParams<T>) {
		this.loadOptions$ = params.loadOptions$;
		this.valueGetter = params.valueGetter;
		this.displayValueGetter = params.displayValueGetter;
		this.displayWithFn = params.displayWithFn;
		this.placeholder = params.placeholder;
	}
}
