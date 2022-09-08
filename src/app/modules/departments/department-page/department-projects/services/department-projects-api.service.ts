import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ProjectApiService } from '@api/project-service/services/project-api.service';
import { FindResponse } from '@app/types/operation-result-response.interface';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { MAX_INT32 } from '@app/utils/utils';
import { ProjectStatusType } from '@api/project-service/models/project-status-type';

export interface FindProjectsParams {
	departmentid?: string;
	isascendingsort?: boolean;
	projectstatus?: ProjectStatusType;
	nameincludesubstring?: string;
	includedepartment?: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class DepartmentProjectsApiService {
	constructor(private projectApi: ProjectApiService) {}

	public findDepartmentProjects(
		departmentId: string,
		params?: FindProjectsParams
	): Observable<FindResponse<ProjectInfo>> {
		return this.findProjects({ departmentid: departmentId, ...params });
	}

	public findTransferProjects(
		excludeDepartmentId: string,
		params: FindProjectsParams
	): Observable<FindResponse<ProjectInfo>> {
		if (!params.departmentid && !params.nameincludesubstring) {
			return of(new FindResponse());
		}
		return this.findProjects({ ...params, includedepartment: true }).pipe(
			// exclude projects from current department
			map((res: FindResponse<ProjectInfo>) => {
				const filteredData = res.data.filter((p: ProjectInfo) => p.department?.id !== excludeDepartmentId);
				return { ...res, data: filteredData };
			})
		);
	}

	private findProjects(params: FindProjectsParams): Observable<FindResponse<ProjectInfo>> {
		return this.projectApi
			.findProjects({
				skipCount: 0,
				takeCount: MAX_INT32,
				...params,
			})
			.pipe(map((res) => new FindResponse(res)));
	}
}
