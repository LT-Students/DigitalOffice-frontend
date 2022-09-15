import { Inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { PAGINATOR_DEFAULT_OPTIONS, PaginatorDefaultOptions } from '@shared/component/paginator/paginator.component';
import { ListParams, QueryParamsConverter } from '@app/types/do-table-data-source';
import { FindDepartmentsParams } from '../services/department.service';
import { DepartmentUrlStatus } from '../models/department-status';

export enum ClientQueryParam {
	Status = 'status',
	Search = 'search',
	Sort = 'sort',
}

interface QueryUrlParams {
	search: string | null;
	status: string | null;
	sort: string | null;
}

@Injectable({
	providedIn: 'root',
})
export class DepartmentListQueriesService extends QueryParamsConverter<
	Params,
	Omit<FindDepartmentsParams, 'skipCount' | 'takeCount'>
> {
	constructor(@Inject(PAGINATOR_DEFAULT_OPTIONS) paginatorDefaults: PaginatorDefaultOptions) {
		super(paginatorDefaults);
	}

	public getAdditionalQueryUrlParams(params: ListParams): QueryUrlParams {
		return {
			search: params['search'] || null,
			status: params['status'] || null,
			sort: params.active && params.direction ? `${params.active}_${params.direction}` : null,
		};
	}

	public getAdditionalRequestParams(params: Params): Omit<FindDepartmentsParams, 'skipCount' | 'takeCount'> {
		return {
			nameIncludeSubstring: params[ClientQueryParam.Search],
			isAscendingSort: this.getSortParamValue(params[ClientQueryParam.Sort]),
			isActive: this.getStatusValue(params[ClientQueryParam.Status]),
		};
	}

	public convertListParamsToRequestParams(listParams: ListParams): FindDepartmentsParams {
		const pageIndex = listParams.pageIndex || 0;
		const pageSize = listParams.pageSize || this.paginatorDefaults.pageSize;
		return {
			skipCount: pageIndex * pageSize,
			takeCount: pageSize,
			isActive: this.getStatusValue(listParams['status']),
			nameIncludeSubstring: listParams['search'],
			isAscendingSort: listParams.direction === 'asc',
		};
	}

	private getStatusValue(status?: string): boolean | undefined {
		if (status == null) {
			return undefined;
		}
		if (status === DepartmentUrlStatus.Active) {
			return true;
		}
		if (status === DepartmentUrlStatus.Archived) {
			return false;
		}
		return undefined;
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
