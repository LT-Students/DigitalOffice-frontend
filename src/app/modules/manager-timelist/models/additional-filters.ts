import { Observable } from 'rxjs';
import { FilterDef } from '../../dynamic-filter/models';
import { FilterEvent } from '../../dynamic-filter/dynamic-filter.component';
import { UserStat } from './user-stat';

export abstract class AdditionalTimelistFilters {
	abstract getAdditionalFilters(): Observable<FilterDef[]>;
	abstract filterFn(stats: UserStat[], filterValue: FilterEvent): UserStat[];
}
