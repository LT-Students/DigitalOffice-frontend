import { Observable, of } from 'rxjs';
import { ValidatorFn } from '@angular/forms';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';

export interface IWorkInfoConfig {
	label: string;
	value: any;
	displayValueGetter?: (o: any) => any;
	controlValueGetter?: (o: any) => any;
	type: 'select' | 'date' | 'autocomplete';
	placeholder?: string;
	validators?: ValidatorFn[];
	submitFn: (...args: any[]) => Observable<any>;
	options?: any[];
	options$?: (params: {
		takeCount: number;
		skipCount: number;
		nameIncludeSubstring?: string;
	}) => Observable<OperationResultResponse<any[]>>;
}

export class WorkInfoConfig {
	public type: 'select' | 'date' | 'autocomplete';
	public label: string;
	public value: any;
	public displayValueGetter: (o: any) => any;
	public controlValueGetter: (o: any) => any;
	public placeholder: string;
	public validators: ValidatorFn[];
	public submitFn: (...args: any[]) => Observable<any>;
	public options: any[];
	public options$: (params: {
		takeCount: number;
		skipCount: number;
		nameIncludeSubstring?: string;
	}) => Observable<OperationResultResponse<any[]>>;

	constructor(params: IWorkInfoConfig) {
		this.type = params.type;
		this.label = params.label;
		this.value = params.value;
		this.displayValueGetter = params.displayValueGetter || ((o: any) => o);
		this.controlValueGetter = params.controlValueGetter || ((o: any) => o);
		this.placeholder = params.placeholder || '';
		this.validators = params.validators || [];
		this.submitFn = params.submitFn;
		this.options = params.options || [];
		this.options$ = params.options$ || ((_: any) => of({ errors: [] }));
	}
}
