import { Inject, Injectable } from '@angular/core';
import {
	PageEvent,
	PAGINATOR_DEFAULT_OPTIONS,
	PaginatorDefaultOptions,
} from '@shared/component/paginator/paginator.component';
import { Params, Router } from '@angular/router';
import { SortDirection } from '@angular/material/sort';
import { FilterEvent } from '../../dynamic-filter/dynamic-filter.component';
import { FindFeedbackParams } from '../services/feedback.service';

export enum ClientQueryParam {
	Category = 'category',
	Sort = 'sort',
}

interface QueryUrlParams {
	pageIndex: number | null;
	pageSize: number | null;
	category: string | null;
	sort: string | null;
}

export type ListParams = Partial<FilterEvent & { active: string; direction: SortDirection }> & PageEvent;

@Injectable({
	providedIn: 'root',
})
export class FeedbackListQueriesService {
	constructor(
		@Inject(PAGINATOR_DEFAULT_OPTIONS) private paginatorDefaults: PaginatorDefaultOptions,
		private router: Router
	) {}

	public convertListParamsToQueryUrlParams(params: ListParams): QueryUrlParams {
		return {
			pageIndex: params.pageIndex || null,
			pageSize: params.pageSize === this.paginatorDefaults.pageSize ? null : params.pageSize,
			category: params['category'],
			sort: params.active && params.direction ? `${params.active}_${params.direction}` : null,
		};
	}

	public convertQueryUrlParamsToEndpointParams(params: Params): FindFeedbackParams {
		const pageIndex = Number(params['pageIndex'] || 0);
		const pageSize = Number(params['pageSize'] || this.paginatorDefaults.pageSize);

		return {
			skipCount: pageIndex * pageSize,
			takeCount: pageSize,
			feedbacktype: params[ClientQueryParam.Category],
		};
	}

	private getSortParamValue(sort?: string): boolean | undefined {
		try {
			if (!sort) {
				return true;
			}
			const direction = sort.split('_')[1];
			if (direction === 'rand') {
				return;
			}
			return direction === 'asc';
		} catch (e) {
			return true;
		}
	}
}
