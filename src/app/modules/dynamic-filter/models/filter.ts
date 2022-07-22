import { ControlValueAccessor } from '@angular/forms';
import { InputComponent } from '../components/input/input.component';
import { SelectComponent } from '../components/select/select.component';
import { AlphabetSortComponent } from '../components/alphabet-sort/alphabet-sort.component';
import { AutocompleteComponent } from '../components/autocomplete/autocomplete.component';
import { SlideToggleComponent, SlideToggleParams } from '../components/slide-toggle/slide-toggle.component';
import { AutocompleteFilterParams } from './autocomplete';
import { SelectFilterParams } from './select';
import { InputFilterParams } from './input';

export const FILTER_TYPES = {
	input: InputComponent,
	select: SelectComponent,
	alphabetSort: AlphabetSortComponent,
	autocomplete: AutocompleteComponent,
	buttonToggle: SlideToggleComponent,
};

export type FilterTypes = keyof typeof FILTER_TYPES;

export type FilterParams<T = any> =
	| InputFilterParams
	| SelectFilterParams<T>
	| AutocompleteFilterParams<T>
	| SlideToggleParams;

export interface Filter<P extends FilterParams> extends ControlValueAccessor {
	params?: P;
}
