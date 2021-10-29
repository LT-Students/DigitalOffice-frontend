import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CredentialsApiService } from '@data/api/user-service/services/credentials-api.service';
import { ChangePasswordRequest } from '@data/api/user-service/models/change-password-request';
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

	public generatePassword(): Observable<string> {
		return this._credentialsService.generatePassword();
	}

	public changePassword(body: ChangePasswordRequest): Observable<OperationResultResponse<{} | null>> {
		return this._credentialsService.changePassword({ body });
	}

	public forgotPassword(params: IForgotPasswordRequest): Observable<OperationResultResponse<{} | null>> {
		return this._credentialsService.forgotPassword(params);
	}

	public checkPendingCredentials(userId: UUID): Observable<OperationResultResponse<{} | null>> {
		return this._credentialsService.checkPendingCredentials({ userid: userId });
	}
}
