import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProjectApiService } from '@api/project-service/services/project-api.service';
import { FindResponse } from '@app/types/operation-result-response.interface';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { MAX_INT32 } from '@app/utils/utils';
import { ProjectStatusType } from '@api/project-service/models/project-status-type';

export interface FindDepartmentProjectsParams {
	isascendingsort?: boolean;
	projectstatus?: ProjectStatusType;
	nameincludesubstring?: string;
}

@Injectable({
	providedIn: 'root',
})
export class DepartmentProjectsApiService {
	constructor(private projectApi: ProjectApiService) {}

	public findProjects(
		departmentId: string,
		params?: FindDepartmentProjectsParams
	): Observable<FindResponse<ProjectInfo>> {
		return this.projectApi
			.findProjects({
				departmentid: departmentId,
				skipCount: 0,
				takeCount: MAX_INT32,
				...params,
			})
			.pipe(map((res) => new FindResponse(res)));
	}
}
