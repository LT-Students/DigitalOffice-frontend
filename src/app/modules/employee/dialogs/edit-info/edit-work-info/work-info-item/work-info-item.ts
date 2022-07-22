import { Observable, of } from 'rxjs';
import { ValidatorFn } from '@angular/forms';

export interface IWorkInfoConfig {
	label: string;
	value: any;
	canEdit$?: Observable<boolean>;
	displayWithFn?: (o: any) => any;
	valueGetter?: (o: any) => any;
	filterFn?: (filterValue: string, options: any[]) => any[];
	type: 'select' | 'date' | 'autocomplete';
	placeholder?: string;
	validators?: ValidatorFn[];
	submitFn: (...args: any[]) => Observable<any>;
	options?: any[];
	options$?: Observable<any[]>;
}

export class WorkInfoConfig {
	public type: 'select' | 'date' | 'autocomplete';
	public label: string;
	public value: any;
	public canEdit$: Observable<boolean>;
	public displayWithFn: (o: any) => any;
	public valueGetter: (o: any) => any;
	public filterFn?: (filterValue: string, options: any[]) => any[];
	public placeholder: string;
	public validators: ValidatorFn[];
	public submitFn: (...args: any[]) => Observable<any>;
	public options: any[];
	public options$?: Observable<any[]>;

	constructor(params: IWorkInfoConfig) {
		this.type = params.type;
		this.label = params.label;
		this.value = params.value;
		this.canEdit$ = params.canEdit$ || of(true);
		this.displayWithFn = params.displayWithFn || ((o: any) => o);
		this.valueGetter = params.valueGetter || ((o: any) => o);
		this.placeholder = params.placeholder || '';
		this.validators = params.validators || [];
		this.submitFn = params.submitFn;
		this.options = params.options || [];
		this.options$ = params.options$;
		this.filterFn = params.filterFn;
	}
}
