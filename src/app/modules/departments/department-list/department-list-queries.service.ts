import { Inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { PAGINATOR_DEFAULT_OPTIONS, PaginatorDefaultOptions } from '@shared/component/paginator/paginator.component';
import { FindDepartmentsParams } from '../department.service';
import { ListParams } from '../../feedback/feedback-list/feedback-list-queries.service';

export enum ClientQueryParam {
	Status = 'status',
	Search = 'search',
	Sort = 'sort',
}

interface QueryUrlParams {
	pageIndex: number | null;
	pageSize: number | null;
	search: string | null;
	status: string | null;
	sort: string | null;
}

@Injectable({
	providedIn: 'root',
})
export class DepartmentListQueriesService {
	constructor(@Inject(PAGINATOR_DEFAULT_OPTIONS) private paginatorDefaults: PaginatorDefaultOptions) {}

	public convertListParamsToQueryUrlParams(params: ListParams): QueryUrlParams {
		return {
			pageIndex: params.pageIndex || null,
			pageSize: params.pageSize === this.paginatorDefaults.pageSize ? null : params.pageSize,
			search: params['search'] || null,
			status: params['status'] != null ? params['status'] : null,
			sort: params.active && params.direction ? `${params.active}_${params.direction}` : null,
		};
	}

	public convertQueryURLParamsToEndpointParams(params: Params): FindDepartmentsParams {
		const pageIndex = Number(params['pageIndex'] || 0);
		const pageSize = Number(params['pageSize'] || this.paginatorDefaults.pageSize);

		return {
			skipCount: pageIndex * pageSize,
			takeCount: pageSize,
			nameIncludeSubstring: params[ClientQueryParam.Search],
			isAscendingSort: this.getSortParamValue(params[ClientQueryParam.Sort]),
			isActive: params[ClientQueryParam.Status] != null ? params[ClientQueryParam.Status] : undefined,
		};
	}

	private getSortParamValue(sort?: string): boolean {
		try {
			if (!sort) {
				return true;
			}
			const direction = sort.split('_')[1];

			return direction === 'asc';
		} catch (e) {
			return true;
		}
	}
}
