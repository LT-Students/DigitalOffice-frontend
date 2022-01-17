import { Injectable } from '@angular/core';
import { WorkTimeApiService } from '@data/api/time-service/services/work-time-api.service';
import { LeaveTimeApiService } from '@data/api/time-service/services/leave-time-api.service';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@data/api/time-service/models/operation-result-response';
import { EditWorkTimeRequest } from '@data/api/time-service/models/edit-work-time-request';
import { WorkTimeDayJobApiService } from '@data/api/time-service/services/work-time-day-job-api.service';
import { WorkTimeDayJobIdApiService } from '@data/api/time-service/services/work-time-day-job-id-api.service';
import { WorkTimeMonthLimitApiService } from '@data/api/time-service/services/work-time-month-limit-api.service';
import { EditLeaveTimeRequest } from '@data/api/time-service/models/edit-leave-time-request';
import { FindResultResponseWorkTimeMonthLimitInfo } from '@data/api/time-service/models/find-result-response-work-time-month-limit-info';
import { EditWorkTimeMonthLimitRequest } from '@data/api/time-service/models/edit-work-time-month-limit-request';
import { FindResultResponseWorkTimeResponse } from '@data/api/time-service/models/find-result-response-work-time-response';
import { FindResultResponseLeaveTimeResponse } from '@data/api/time-service/models/find-result-response-leave-time-response';
import { StatApiService } from '@data/api/time-service/services/stat-api.service';
import { ImportApiService } from '@data/api/time-service/services/import-api.service';
import { FindResultResponseStatInfo } from '@data/api/time-service/models/find-result-response-stat-info';
import { OperationResultResponseByteArray } from '@data/api/time-service/models/operation-result-response-byte-array';
import { CreateWorkTimeRequest } from '@data/api/time-service/models/create-work-time-request';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';

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
	departmentId?: string;
	projectId?: string;
	month?: number;
	year?: number;
	takeCount?: number;
	skipCount?: number;
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
	leaveType: 'Vacation' | 'SickLeave' | 'Training' | 'Idle';
	minutes: number;
	startTime?: string;
	userId: string;
}

@Injectable()
export class TimeService {
	constructor(
		private _responseModel: ResponseMessageModel,
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
		return this._workTimeService
			.editWorkTime(params)
			.pipe(this._responseModel.message(MessageTriggeredFrom.WorkTime, MessageMethod.Edit));
	}

	public createWorkTime(body: CreateWorkTimeRequest): Observable<OperationResultResponse> {
		return this._workTimeService
			.createWorkTime({ body })
			.pipe(this._responseModel.message(MessageTriggeredFrom.WorkTime, MessageMethod.Create));
	}

	public addLeaveTime(body: ICreateLeaveTimeRequest): Observable<OperationResultResponse> {
		return this._leaveTimeApiService.createLeaveTime({ body });
	}

	public findLeaveTimes(params?: IFindLeaveTimesRequest): Observable<FindResultResponseLeaveTimeResponse> {
		return this._leaveTimeApiService.findLeaveTimes(params);
	}

	public editLeaveTime(params: IEditLeaveTimeRequest): Observable<OperationResultResponse> {
		return this._editLeaveTime(params).pipe(
			this._responseModel.message(MessageTriggeredFrom.LeaveTime, MessageMethod.Edit)
		);
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
		return this._editLeaveTime(deleteRequest).pipe(
			this._responseModel.message(MessageTriggeredFrom.LeaveTime, MessageMethod.Remove)
		);
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

	public findStat(params?: IFindStatRequest): Observable<FindResultResponseStatInfo> {
		return this._statService.findStat(params);
	}

	public getImport(params: IGetImport): Observable<OperationResultResponseByteArray> {
		return this._importService.getImport(params);
	}
}
