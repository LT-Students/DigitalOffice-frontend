import { Injectable } from '@angular/core';
import { WorkTimeApiService } from '@data/api/time-service/services/work-time-api.service';
import { LeaveTimeApiService } from '@data/api/time-service/services/leave-time-api.service';
import { CreateWorkTimeRequest } from '@data/api/time-service/models/create-work-time-request';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@data/api/time-service/models/operation-result-response';
import { FindResultResponseWorkTimeInfo } from '@data/api/time-service/models/find-result-response-work-time-info';
import { EditWorkTimeRequest } from '@data/api/time-service/models/edit-work-time-request';
import { CreateLeaveTimeRequest } from '@data/api/time-service/models/create-leave-time-request';
import { FindResultResponseLeaveTimeInfo } from '@data/api/time-service/models/find-result-response-leave-time-info';

export interface IFindWorkTimesRequest {
	userid?: string;
	projectid?: string;
	starttime?: string;
	endtime?: string;
	takeCount?: number;
	skipCount?: number;
}

export interface IEditWorkTimeRequest {
	/**
	 * Work time global unique identifier.
	 */
	workTimeId: string;
	body: EditWorkTimeRequest
}

export interface IFindLeaveTimesRequest {
	userid?: string;
	starttime?: string;
	endtime?: string;
	takeCount?: number;
	skipCount?: number;
}

@Injectable()
export class TimeService {
	constructor(
		private _workTimeService: WorkTimeApiService,
		private _leaveTimeApiService: LeaveTimeApiService,
	) {
	}

	public addWorkTime(body: CreateWorkTimeRequest): Observable<OperationResultResponse> {
		return this._workTimeService.addWorkTime({ body });
	}

	public findWorkTimes(params: IFindWorkTimesRequest): Observable<FindResultResponseWorkTimeInfo> {
		return this._workTimeService.findWorkTimes(params);
	}

	public editWorkTime(params: IEditWorkTimeRequest): Observable<OperationResultResponse> {
		return this._workTimeService.editWorkTime(params);
	}

	public addLeaveTime(body: CreateLeaveTimeRequest): Observable<OperationResultResponse> {
		return this._leaveTimeApiService.addLeaveTime({ body });
	}

	public findLeaveTimes(params: IFindLeaveTimesRequest): Observable<FindResultResponseLeaveTimeInfo> {
		return this._leaveTimeApiService.findLeaveTimes(params);
	}
}
