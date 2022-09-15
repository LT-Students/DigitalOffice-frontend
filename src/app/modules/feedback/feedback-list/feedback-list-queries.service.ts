import { Inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ListParams, QueryParamsConverter } from '@app/types/do-table-data-source';
import { PAGINATOR_DEFAULT_OPTIONS, PaginatorDefaultOptions } from '@shared/component/paginator/paginator.component';
import { FindFeedbackParams } from '../services/feedback.service';

export enum ClientQueryParam {
	Category = 'category',
	Sort = 'sort',
}

interface QueryUrlParams {
	category: string | null;
	sort: string | null;
}

@Injectable({
	providedIn: 'root',
})
export class FeedbackListQueriesService extends QueryParamsConverter<
	Params,
	Omit<FindFeedbackParams, 'skipCount' | 'takeCount'>
> {
	constructor(@Inject(PAGINATOR_DEFAULT_OPTIONS) paginatorDefaults: PaginatorDefaultOptions) {
		super(paginatorDefaults);
	}

	public getAdditionalQueryUrlParams(params: ListParams): QueryUrlParams {
		return {
			category: params[ClientQueryParam.Category],
			sort: params.active && params.direction ? `${params.active}_${params.direction}` : null,
		};
	}
	public getAdditionalRequestParams(params: Params): Omit<FindFeedbackParams, 'skipCount' | 'takeCount'> {
		return {
			feedbacktype: params[ClientQueryParam.Category],
			orderbydescending: this.getSortParamValue(params[ClientQueryParam.Sort]),
		};
	}

	public convertListParamsToRequestParams(listParams: ListParams): FindFeedbackParams {
		const pageIndex = listParams.pageIndex || 0;
		const pageSize = listParams.pageSize || this.paginatorDefaults.pageSize;
		return {
			skipCount: pageIndex * pageSize,
			takeCount: pageSize,
			feedbacktype: listParams[ClientQueryParam.Category],
			orderbydescending: listParams.direction === 'asc',
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
