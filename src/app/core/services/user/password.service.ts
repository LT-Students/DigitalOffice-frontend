import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { ChangePasswordRequest } from '@data/api/user-service/models/change-password-request';
import { IForgotPasswordRequest } from '@app/services/user/credentials.service';
import { PasswordApiService } from '@data/api/user-service/services/password-api.service';
import { ReconstructPasswordRequest } from '@data/api/user-service/models/reconstruct-password-request';

@Injectable({
	providedIn: 'root',
})
export class PasswordService {
	constructor(private _passwordService: PasswordApiService) {}

	public generatePassword(): Observable<string> {
		return this._passwordService.generatePassword();
	}

	public changePassword(body: ChangePasswordRequest): Observable<OperationResultResponse<{} | null>> {
		return this._passwordService.changePassword({ body });
	}

	public reconstructPassword(body: ReconstructPasswordRequest): Observable<OperationResultResponse<{} | null>> {
		return this._passwordService.reconstructPassword({ body });
	}

	public forgotPassword(params: IForgotPasswordRequest): Observable<OperationResultResponse<{} | null>> {
		return this._passwordService.forgotPassword(params);
	}
}
