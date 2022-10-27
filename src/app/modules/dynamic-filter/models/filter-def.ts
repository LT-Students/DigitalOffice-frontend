import { FilterParams, FilterTypes } from './filter';

export interface FilterDef {
	key: string;
	type?: FilterTypes;
	initialValue?: any;
	params?: FilterParams;
	width?: number;
	style?: { [key: string]: any };
}
