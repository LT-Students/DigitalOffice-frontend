import { Observable, of } from 'rxjs';
import { ValidatorFn } from '@angular/forms';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';

export interface IWorkInfoConfig {
	label: string;
	value: any;
	canEdit$?: Observable<boolean>;
	displayValueGetter?: (o: any) => any;
	optionDisplayValueGetter?: (o: any) => any;
	controlValueGetter?: (o: any) => any;
	type: 'select' | 'date' | 'autocomplete';
	placeholder?: string;
	validators?: ValidatorFn[];
	submitFn: (...args: any[]) => Observable<any>;
	options?: any[];
	selectOption$?: Observable<any[]>;
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
	public canEdit$: Observable<boolean>;
	public displayValueGetter: (o: any) => any;
	public optionDisplayValueGetter: (o: any) => any;
	public controlValueGetter: (o: any) => any;
	public placeholder: string;
	public validators: ValidatorFn[];
	public submitFn: (...args: any[]) => Observable<any>;
	public options: any[];
	public selectOption$?: Observable<any[]>;
	public options$: (params: {
		takeCount: number;
		skipCount: number;
		nameIncludeSubstring?: string;
	}) => Observable<OperationResultResponse<any[]>>;

	constructor(params: IWorkInfoConfig) {
		this.type = params.type;
		this.label = params.label;
		this.value = params.value;
		this.canEdit$ = params.canEdit$ || of(true);
		this.displayValueGetter = params.displayValueGetter || ((o: any) => o);
		this.optionDisplayValueGetter = params.optionDisplayValueGetter || this.displayValueGetter;
		this.controlValueGetter = params.controlValueGetter || ((o: any) => o);
		this.placeholder = params.placeholder || '';
		this.validators = params.validators || [];
		this.submitFn = params.submitFn;
		this.options = params.options || [];
		this.selectOption$ = params.selectOption$;
		this.options$ = params.options$ || ((_: any) => of({ errors: [] }));
	}
}
