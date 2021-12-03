import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CredentialsApiService } from '@data/api/user-service/services/credentials-api.service';
import { CreateCredentialsRequest } from '@data/api/user-service/models/create-credentials-request';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { UUID } from '@app/types/uuid.type';

export interface IForgotPasswordRequest {
	userEmail: string;
}

@Injectable({
	providedIn: 'root',
})
export class CredentialsService {
	constructor(private _credentialsService: CredentialsApiService) {}

	public createCredentials(body: CreateCredentialsRequest): Observable<OperationResultResponse<{} | null>> {
		return this._credentialsService.createCredentials({ body });
	}

	public checkPendingCredentials(userId: UUID): Observable<OperationResultResponse<{} | null>> {
		return this._credentialsService.checkPendingCredentials({ userid: userId });
	}
}
