import { Injectable } from '@angular/core';
import { WorkTimeApiService } from '@data/api/time-service/services/work-time-api.service';
import { LeaveTimeApiService } from '@data/api/time-service/services/leave-time-api.service';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@data/api/time-service/models/operation-result-response';
import { FindResultResponseWorkTimeInfo } from '@data/api/time-service/models/find-result-response-work-time-info';
import { EditWorkTimeRequest } from '@data/api/time-service/models/edit-work-time-request';
import { CreateLeaveTimeRequest } from '@data/api/time-service/models/create-leave-time-request';
import { FindResultResponseLeaveTimeInfo } from '@data/api/time-service/models/find-result-response-leave-time-info';
import { WorkTimeDayJobApiService } from '@data/api/time-service/services/work-time-day-job-api.service';
import { WorkTimeDayJobIdApiService } from '@data/api/time-service/services/work-time-day-job-id-api.service';
import { WorkTimeMonthLimitApiService } from '@data/api/time-service/services/work-time-month-limit-api.service';
import { EditLeaveTimeRequest } from '@data/api/time-service/models/edit-leave-time-request';
import { FindResultResponseWorkTimeMonthLimitInfo } from '@data/api/time-service/models/find-result-response-work-time-month-limit-info';
import { EditWorkTimeMonthLimitRequest } from '@data/api/time-service/models/edit-work-time-month-limit-request';

export interface IFindWorkTimesRequest {
	userid?: string;
	projectid?: string;
	month?: number;
	year?: number;
	includedayjobs?: boolean;
	takeCount?: number;
	skipCount?: number;
}

export interface IEditWorkTimeRequest {
	workTimeId: string;
	body: EditWorkTimeRequest;
}

export interface IEditLeaveTimeRequest {
	leaveTimeId: string;
	body: EditLeaveTimeRequest;
}

export interface IFindLeaveTimesRequest {
	userid?: string;
	starttime?: string;
	endtime?: string;
	takeCount?: number;
	skipCount?: number;
}

export interface IFindWorkTimeMonthLimitRequest {
	month?: number;
	year?: number;
	takeCount?: number;
	skipCount?: number;
}

export interface IEditWorkTimeMonthLimitRequest {
	workTimeMonthLimitId: string;
	body: EditWorkTimeMonthLimitRequest;
}

@Injectable()
export class TimeService {
	constructor(
		private _workTimeService: WorkTimeApiService,
		private _leaveTimeApiService: LeaveTimeApiService,
		private _workTimeDayJobApiService: WorkTimeDayJobApiService,
		private _workTimeDayJobIdApiService: WorkTimeDayJobIdApiService,
		private _workTimeMonthLimitApiService: WorkTimeMonthLimitApiService
	) {}

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

	public editLeaveTime(params: IEditLeaveTimeRequest): Observable<OperationResultResponse> {
		return this._leaveTimeApiService.editLeaveTime(params);
	}

	public findWorkTimeMonthLimit(params: IFindWorkTimeMonthLimitRequest): Observable<FindResultResponseWorkTimeMonthLimitInfo> {
		return this._workTimeMonthLimitApiService.findWorkTimeMonthLimits(params);
	}

	public editWorkTimeMonthLimit(params: IEditWorkTimeMonthLimitRequest): Observable<OperationResultResponse> {
		return this._workTimeService.editWorkTimeMonthLimit(params);
	}
}
