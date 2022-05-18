import { Injectable } from '@angular/core';
import { FilterUserApiService } from '@api/filter-service/services/filter-user-api.service';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { UserInfo } from '@api/filter-service/models/user-info';

export interface FilterUsersRequest {
	skipCount: number;
	takeCount: number;
	departmentsIds?: Array<string>;
	positionsIds?: Array<string>;
	rolesIds?: Array<string>;
	officesIds?: Array<string>;
	isascendingsort?: boolean;
	fullnameincludesubstring?: string;
}

@Injectable({
	providedIn: 'root',
})
export class FilterService {
	constructor(private filterApiService: FilterUserApiService) {}

	public filterUsers(params: FilterUsersRequest): Observable<OperationResultResponse<UserInfo[]>> {
		return this.filterApiService.filterUser(params);
	}
}
