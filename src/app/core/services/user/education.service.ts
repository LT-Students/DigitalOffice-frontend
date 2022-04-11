import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@api/user-service/models/operation-result-response';
import { CreateEducationRequest } from '@api/education-service/models';
import { EducationApiService } from '@api/education-service/services';
import { EditEducationRequest } from '@api/education-service/models';

export interface IEditEducationRequest {
	/**
	 * Specific education id
	 */
	educationId: string;
	body?: EditEducationRequest;
}

export interface IRemoveEducationRequest {
	/**
	 * Education global unique identifier.
	 */
	educationId: string;
}

@Injectable({
	providedIn: 'root',
})
export class EducationService {
	constructor(private _educationService: EducationApiService) {}

	// public createEducation(body: CreateEducationRequest): Observable<OperationResultResponse> {
	// 	return this._educationService.createEducation({ body });
	// }
	//
	// public editEducation(params: IEditEducationRequest): Observable<OperationResultResponse> {
	// 	return this._educationService.editEducation(params);
	// }
	//
	// public removeEducation(params: IRemoveEducationRequest): Observable<OperationResultResponse> {
	// 	return this._educationService.removeEducation(params);
	// }
}
