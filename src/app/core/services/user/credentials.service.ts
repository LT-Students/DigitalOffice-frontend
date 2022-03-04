import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CredentialsApiService } from '@data/api/user-service/services/credentials-api.service';
import { CreateCredentialsRequest } from '@data/api/user-service/models/create-credentials-request';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { UUID } from '@app/types/uuid.type';
import { PendingApiService } from '@data/api/user-service/services/pending-api.service';

export interface IForgotPasswordRequest {
	userEmail: string;
}

@Injectable({
	providedIn: 'root',
})
export class CredentialsService {
	constructor(private credentialsService: CredentialsApiService, private pendingService: PendingApiService) {}

	public createCredentials(body: CreateCredentialsRequest): Observable<OperationResultResponse<{} | null>> {
		return this.credentialsService.createCredentials({ body });
	}

	public checkPendingCredentials(userId: UUID): Observable<OperationResultResponse<{} | null>> {
		return this.pendingService.checkPending({ userid: userId });
	}
}
