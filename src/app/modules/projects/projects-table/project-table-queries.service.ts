import { Inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { IFindProjects } from '@app/services/project/project.service';
import {
	PageEvent,
	PAGINATOR_DEFAULT_OPTIONS,
	PaginatorDefaultOptions,
} from '@shared/component/paginator/paginator.component';
import { FilterEvent } from '../../dynamic-filter/dynamic-filter.component';

export enum ClientQueryParam {
	Department = 'department',
	Status = 'status',
	Search = 'search',
	Sort = 'sort',
	AllProjects = 'projects',
}

export interface SortParam {
	sort: string;
}

@Injectable({
	providedIn: 'root',
})
export class ProjectTableQueriesService {
	constructor(@Inject(PAGINATOR_DEFAULT_OPTIONS) private paginatorDefaults: PaginatorDefaultOptions) {}

	public filterQueries(params: Partial<FilterEvent & SortParam & PageEvent>) {
		const filteredParams = Object.keys(params).reduce(
			(a, k: string) => ({ ...a, [k]: params[k] != null && params[k] !== '' ? params[k] : null }),
			{} as Record<string, any>
		);
		if (filteredParams['pageIndex'] === 0) {
			filteredParams['pageIndex'] = null;
		}
		if (filteredParams['pageSize'] === this.paginatorDefaults.pageSize) {
			filteredParams['pageSize'] = null;
		}
		const sort = filteredParams[ClientQueryParam.Sort];
		if (sort && !sort.split('_')[1]) {
			filteredParams[ClientQueryParam.Sort] = null;
		}
		if (filteredParams[ClientQueryParam.AllProjects] !== 'all') {
			filteredParams[ClientQueryParam.AllProjects] = null;
		}

		return filteredParams;
	}

	public parseQueryParams(params: Params, userId: string): IFindProjects {
		const pageIndex = Number(params['pageIndex'] || 0);
		const pageSize = Number(params['pageSize'] || this.paginatorDefaults.pageSize);

		return {
			skipCount: pageIndex * pageSize,
			takeCount: pageSize,
			nameincludesubstring: params[ClientQueryParam.Search],
			projectstatus: params[ClientQueryParam.Status],
			isascendingsort: params[ClientQueryParam.Sort] && params[ClientQueryParam.Sort].split('_')[1] === 'asc',
			userid: params[ClientQueryParam.AllProjects] === 'all' ? undefined : userId,
		};
	}
}