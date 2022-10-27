import { Injectable } from '@angular/core';
import { AutocompleteConfigsService } from '@shared/component/autocomplete/autocomplete-configs.service';
import { Icons } from '@shared/modules/icons/icons';
import { AutocompleteFilterParams, FilterDef, InputFilterParams } from '../../dynamic-filter/models';

@Injectable({
	providedIn: 'root',
})
export class FilterConfigService {
	constructor(private autocompleteConfigs: AutocompleteConfigsService) {}

	public getFilterConfig(): FilterDef[] {
		return [
			{
				key: 'name',
				type: 'input',
				params: new InputFilterParams({ placeholder: 'Введите ФИО сотрудника', icon: Icons.Search }),
				style: { flex: 1 },
			},
			{
				key: 'departmentId',
				type: 'autocomplete',
				params: new AutocompleteFilterParams({
					...this.autocompleteConfigs.getDepartmentsConfig(),
					placeholder: 'Выберите департамент',
				}),
				style: { flex: 1 },
			},
		];
	}
}
