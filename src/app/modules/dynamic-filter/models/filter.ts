import { ControlValueAccessor } from '@angular/forms';
import { InputComponent } from '../components/input/input.component';
import { SelectComponent } from '../components/select/select.component';
import { AlphabetSortComponent } from '../components/alphabet-sort/alphabet-sort.component';
import { AutocompleteComponent } from '../components/autocomplete/autocomplete.component';
import { AutocompleteFilterParams } from '../components/autocomplete/autocomplete';
import { SelectFilterParams } from '../components/select/select';
import { InputFilterParams } from '../components/input/input';

export const FILTER_TYPES = {
	input: InputComponent,
	select: SelectComponent,
	alphabetSort: AlphabetSortComponent,
	autocomplete: AutocompleteComponent,
};

export type FilterTypes = keyof typeof FILTER_TYPES;

export type FilterParams<T = any> = InputFilterParams | SelectFilterParams<T> | AutocompleteFilterParams<T>;

export interface Filter<P extends FilterParams> extends ControlValueAccessor {
	params?: P;
}
