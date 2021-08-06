import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@data/api/user-service/models/operation-result-response';
import { CredentialsApiService } from '@data/api/user-service/services/credentials-api.service';
import { ChangePasswordRequest } from '@data/api/user-service/models/change-password-request';
import { CreateCredentialsRequest } from '@data/api/user-service/models/create-credentials-request';

export interface IForgotPasswordRequest {
	userEmail: string;
}

@Injectable({
	providedIn: 'root',
})
export class CredentialsService {
	constructor(private _credentialsService: CredentialsApiService) {}

	public createCredentials(body: CreateCredentialsRequest): Observable<OperationResultResponse> {
		return this._credentialsService.createCredentials({ body });
	}

	public generatePassword(): Observable<string> {
		return this._credentialsService.generatePassword();
	}

	public changePassword(body: ChangePasswordRequest): Observable<OperationResultResponse> {
		return this._credentialsService.changePassword({ body });
	}

	public forgotPassword(params: IForgotPasswordRequest): Observable<OperationResultResponse> {
		return this._credentialsService.forgotPassword(params);
	}
}