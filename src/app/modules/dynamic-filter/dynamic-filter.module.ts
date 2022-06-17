import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DynamicFilterComponent } from './dynamic-filter.component';
import { FilterBaseComponent } from './filter-base.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { AlphabetSortComponent } from './components/alphabet-sort/alphabet-sort.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';

@NgModule({
	declarations: [
		DynamicFilterComponent,
		FilterBaseComponent,
		InputComponent,
		SelectComponent,
		AlphabetSortComponent,
		AutocompleteComponent,
	],
	imports: [SharedModule],
	exports: [DynamicFilterComponent],
})
export class DynamicFilterModule {}
