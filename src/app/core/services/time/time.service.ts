import { Injectable } from '@angular/core';
import { WorkTimeApiService } from '@api/time-service/services/work-time-api.service';
import { LeaveTimeApiService } from '@api/time-service/services/leave-time-api.service';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@api/time-service/models/operation-result-response';
import { EditWorkTimeRequest } from '@api/time-service/models/edit-work-time-request';
import { WorkTimeDayJobApiService } from '@api/time-service/services/work-time-day-job-api.service';
import { WorkTimeDayJobIdApiService } from '@api/time-service/services/work-time-day-job-id-api.service';
import { WorkTimeMonthLimitApiService } from '@api/time-service/services/work-time-month-limit-api.service';
import { EditLeaveTimeRequest } from '@api/time-service/models/edit-leave-time-request';
import { FindResultResponseWorkTimeMonthLimitInfo } from '@api/time-service/models/find-result-response-work-time-month-limit-info';
import { EditWorkTimeMonthLimitRequest } from '@api/time-service/models/edit-work-time-month-limit-request';
import { FindResultResponseWorkTimeResponse } from '@api/time-service/models/find-result-response-work-time-response';
import { FindResultResponseLeaveTimeResponse } from '@api/time-service/models/find-result-response-leave-time-response';
import { StatApiService } from '@api/time-service/services/stat-api.service';
import { ImportApiService } from '@api/time-service/services/import-api.service';
import { OperationResultResponseByteArray } from '@api/time-service/models/operation-result-response-byte-array';
import { CreateWorkTimeRequest } from '@api/time-service/models/create-work-time-request';
import { FindResultResponseUserStatInfo } from '@api/time-service/models/find-result-response-user-stat-info';
import { LeaveType } from '@api/time-service/models/leave-type';

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
	includedeactivated?: boolean;
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

export interface IFindStatRequest {
	departmentsIds?: Array<string>;
	projectId?: string;
	ascendingsort?: boolean;
	nameincludesubstring?: string;
	month: number;
	year: number;
	takeCount: number;
	skipCount: number;
}

export interface IGetImport {
	departmentId?: string;
	projectId?: string;
	month: number;
	year: number;
}

export interface ICreateLeaveTimeRequest {
	comment?: string;
	endTime: string;
	leaveType: LeaveType;
	minutes: number;
	startTime: string;
	userId: string;
}

@Injectable({
	providedIn: 'root',
})
export class TimeService {
	constructor(
		private _workTimeService: WorkTimeApiService,
		private _leaveTimeApiService: LeaveTimeApiService,
		private _workTimeDayJobApiService: WorkTimeDayJobApiService,
		private _workTimeDayJobIdApiService: WorkTimeDayJobIdApiService,
		private _workTimeMonthLimitApiService: WorkTimeMonthLimitApiService,
		private _statService: StatApiService,
		private _importService: ImportApiService
	) {}

	public findWorkTimes(params?: IFindWorkTimesRequest): Observable<FindResultResponseWorkTimeResponse> {
		return this._workTimeService.findWorkTimes(params);
	}

	public editWorkTime(params: IEditWorkTimeRequest): Observable<OperationResultResponse> {
		return this._workTimeService.editWorkTime(params);
	}

	public createWorkTime(body: CreateWorkTimeRequest): Observable<OperationResultResponse> {
		return this._workTimeService.createWorkTime({ body });
	}

	public addLeaveTime(body: ICreateLeaveTimeRequest): Observable<OperationResultResponse> {
		return this._leaveTimeApiService.createLeaveTime({ body });
	}

	public findLeaveTimes(params?: IFindLeaveTimesRequest): Observable<FindResultResponseLeaveTimeResponse> {
		return this._leaveTimeApiService.findLeaveTimes(params);
	}

	public editLeaveTime(params: IEditLeaveTimeRequest): Observable<OperationResultResponse> {
		return this._editLeaveTime(params);
	}

	public deleteLeaveTime(leaveTimeId: string): Observable<OperationResultResponse> {
		const deleteRequest: IEditLeaveTimeRequest = {
			leaveTimeId,
			body: [
				{
					op: 'replace',
					path: '/IsActive',
					value: false,
				},
			],
		};
		return this._editLeaveTime(deleteRequest);
	}

	private _editLeaveTime(params: IEditLeaveTimeRequest): Observable<OperationResultResponse> {
		return this._leaveTimeApiService.editLeaveTime(params);
	}

	public findWorkTimeMonthLimit(
		params?: IFindWorkTimeMonthLimitRequest
	): Observable<FindResultResponseWorkTimeMonthLimitInfo> {
		return this._workTimeMonthLimitApiService.findWorkTimeMonthLimits(params);
	}

	public editWorkTimeMonthLimit(params: IEditWorkTimeMonthLimitRequest): Observable<OperationResultResponse> {
		return this._workTimeService.editWorkTimeMonthLimit(params);
	}

	public findStat(params: IFindStatRequest): Observable<FindResultResponseUserStatInfo> {
		return this._statService.findStat(params);
	}

	public getImport(params: IGetImport): Observable<OperationResultResponseByteArray> {
		return this._importService.getImport(params);
	}
}
