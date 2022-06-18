import { Observable } from 'rxjs';
import { Icons } from '@shared/features/icons/icons';

interface ISelectFilterParams<T> {
	options$: Observable<T[]>;
	valueGetter: (o: T) => any;
	displayValueGetter: (o: T) => any;
	allowReset?: boolean;
	placeholder?: string;
	icon?: Icons;
	iconColor?: (o: T) => string;
}

export class SelectFilterParams<T> implements ISelectFilterParams<T> {
	public options$: Observable<T[]>;
	public valueGetter: (o: T) => any;
	public displayValueGetter: (o: T) => any;
	public allowReset?: boolean;
	public placeholder?: string;
	public icon?: Icons;
	public iconColor?: (o: T) => string;

	constructor(params: ISelectFilterParams<T>) {
		this.options$ = params.options$;
		this.valueGetter = params.valueGetter;
		this.displayValueGetter = params.displayValueGetter;
		this.allowReset = params.allowReset;
		this.placeholder = params.placeholder;
		this.icon = params.icon;
		this.iconColor = params.iconColor;
	}
}
