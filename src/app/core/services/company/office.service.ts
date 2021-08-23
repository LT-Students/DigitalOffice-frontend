import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@data/api/company-service/models/operation-result-response';
import { OfficeApiService } from '@data/api/company-service/services/office-api.service';
import { CreateOfficeRequest } from '@data/api/company-service/models/create-office-request';

@Injectable({
	providedIn: 'root',
})
export class OfficeService {

	constructor(private _officeService: OfficeApiService) {}

	public createOffice(body: CreateOfficeRequest): Observable<OperationResultResponse> {
		return this._officeService.createOffice({ body });
	}
}
