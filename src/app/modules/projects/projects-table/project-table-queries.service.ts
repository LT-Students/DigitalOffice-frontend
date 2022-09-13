import { Inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { ListParams, QueryParamsConverter } from '@app/types/do-table-data-source';
import { WithPagination } from '@app/types/find-request.interface';
import { CurrentUserService } from '@app/services/current-user.service';
import { PAGINATOR_DEFAULT_OPTIONS, PaginatorDefaultOptions } from '@shared/component/paginator/paginator.component';
import { FindProjectsParams } from '../project.service';

export enum ClientQueryParam {
	Department = 'department',
	Status = 'status',
	Search = 'search',
	Sort = 'sort',
	AllProjects = 'projects',
}

interface QueryUrlParams {
	[ClientQueryParam.Department]: string | null;
	[ClientQueryParam.Status]: string | null;
	[ClientQueryParam.Search]: string | null;
	[ClientQueryParam.Sort]: string | null;
	[ClientQueryParam.AllProjects]: string | null;
}

@Injectable({
	providedIn: 'root',
})
export class ProjectTableQueriesService extends QueryParamsConverter<Params, FindProjectsParams> {
	constructor(
		@Inject(PAGINATOR_DEFAULT_OPTIONS) paginatorDefaults: PaginatorDefaultOptions,
		private currentUser: CurrentUserService
	) {
		super(paginatorDefaults);
	}

	public getAdditionalQueryUrlParams(params: ListParams): QueryUrlParams {
		return {
			[ClientQueryParam.Department]: params[ClientQueryParam.Department],
			[ClientQueryParam.Status]: params[ClientQueryParam.Status],
			[ClientQueryParam.Search]: params[ClientQueryParam.Search],
			[ClientQueryParam.Sort]: `${params.active}_${params.direction}`,
			[ClientQueryParam.AllProjects]: params[ClientQueryParam.AllProjects] ? null : 'all',
		};
	}

	public getAdditionalRequestParams(params: Params): FindProjectsParams {
		return {
			nameincludesubstring: params[ClientQueryParam.Search],
			projectstatus: params[ClientQueryParam.Status],
			departmentid: params[ClientQueryParam.Department],
			isascendingsort: this.getSortParamValue(params[ClientQueryParam.Sort]),
			userid: params[ClientQueryParam.AllProjects] === 'all' ? undefined : this.getUserId(),
		};
	}

	public convertListParamsToRequestParams(params: ListParams): FindProjectsParams & WithPagination {
		const pageIndex = params.pageIndex || 0;
		const pageSize = params.pageSize || this.paginatorDefaults.pageSize;
		return {
			skipCount: pageIndex * pageSize,
			takeCount: pageSize,
			nameincludesubstring: params[ClientQueryParam.Search],
			projectstatus: params[ClientQueryParam.Status],
			departmentid: params[ClientQueryParam.Department],
			isascendingsort: params.direction === 'asc',
			userid: params[ClientQueryParam.AllProjects] ? this.getUserId() : undefined,
		};
	}

	private getUserId(): string {
		let userId = '';
		this.currentUser.user$.pipe(first()).subscribe({
			next: (u: User) => (userId = u.id),
		});

		return userId;
	}

	private getSortParamValue(sort?: string): boolean | undefined {
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
