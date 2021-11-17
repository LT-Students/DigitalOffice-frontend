import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { OperationResultResponse } from '@data/api/company-service/models/operation-result-response';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyApiService } from '@data/api/office-service/services/company-api.service';
import { CreateOfficeRequest } from '@data/api/office-service/models/create-office-request';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { OfficeApiService } from '@data/api/office-service/services/office-api.service';
import { FindResultResponseOfficeInfo } from '@data/api/office-service/models/find-result-response-office-info';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';

@Injectable({
	providedIn: 'root',
})
export class OfficeService {
	constructor(
		private _companyService: CompanyApiService,
		private _officeService: OfficeApiService,
		private _responseMessage: ResponseMessageModel
	) {}

	public createOffice(body: CreateOfficeRequest): Observable<OperationResultResponse> {
		return this._officeService
			.createOffice({ body })
			.pipe(this._responseMessage.message(MessageTriggeredFrom.Office, MessageMethod.Create));
	}

	public findOffices(params: IFindRequestEx): Observable<FindResultResponseOfficeInfo> {
		return this._companyService.findOffices(params);
	}
}
