import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@data/api/rights-service/models/operation-result-response';
import { IFindRequest } from '@app/types/find-request.interface';
import { TaskApiService } from '@data/api/project-service/services/task-api.service';
import { TaskPropertyApiService } from '@data/api/project-service/services/task-property-api.service';
import { CreateTaskRequest } from '@data/api/project-service/models/create-task-request';
import { EditTaskRequest } from '@data/api/project-service/models/edit-task-request';
import { FindResponseTaskInfo } from '@data/api/project-service/models/find-response-task-info';
import { OperationResultResponseTaskResponse } from '@data/api/project-service/models/operation-result-response-task-response';
import { CreateTaskPropertyRequest } from '@data/api/project-service/models/create-task-property-request';
import { FindResponseTaskProperty } from '@data/api/project-service/models/find-response-task-property';

export interface IEditTaskRequest {
	/**
	 * Task global unique identifier.
	 */
	Id: string;
	body: EditTaskRequest
}

export interface IFindTasksRequest extends IFindRequest {
	/**
	 * The part of find query that the task name should contain.
	 */
	number?: number;
	/**
	 * The part of find query that the task project Id should contain.
	 */
	projectid?: string;
	/**
	 * The part of find query that the user assigned task should contain.
	 */
	assignedto?: string;
}

export interface IGetTaskRequest {
	/**
	 * Task global unique identifier.
	 */
	Id: string;
}

export interface IFindTaskPropertiesRequest extends IFindRequest{
	/**
	 * The part of find query that the task property name should contain.
	 */
	name?: string;
	/**
	 * The part of find query that the task property author Id should contain.
	 */
	authorid?: string;
	/**
	 * The part of find query that the task property projectid should contain.
	 */
	projectid?: string;
}

@Injectable({
	providedIn: 'root'
})
export class TaskService {
	constructor(
		private _taskService: TaskApiService,
		private _taskPropertyService: TaskPropertyApiService,
	) {
	}

	public createTask(body: CreateTaskRequest): Observable<OperationResultResponse> {
		return this._taskService.createTask({ body });
	}

	public editTask(params: IEditTaskRequest): Observable<OperationResultResponse> {
		return this._taskService.editTask(params);
	}

	public findTasks(params: IFindTasksRequest): Observable<FindResponseTaskInfo> {
		return this._taskService.findTasks(params);
	}

	public getTask(params: IGetTaskRequest): Observable<OperationResultResponseTaskResponse> {
		return this._taskService.getTask(params);
	}

	public createTaskProperty(body: CreateTaskPropertyRequest): Observable<OperationResultResponse> {
		return this._taskPropertyService.createTaskProperty({ body });
	}

	public findTaskProperties(params: IFindTaskPropertiesRequest): Observable<FindResponseTaskProperty>  {
		return this._taskPropertyService.findTaskProperties(params);
	}
}
