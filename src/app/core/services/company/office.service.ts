import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationResultResponse } from '@data/api/company-service/models/operation-result-response';
import { CompanyApiService } from '@data/api/office-service/services/company-api.service';
import { CreateOfficeRequest } from '@data/api/office-service/models/create-office-request';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { OfficeApiService } from '@data/api/office-service/services/office-api.service';
import { FindResultResponseOfficeInfo } from '@data/api/office-service/models/find-result-response-office-info';

@Injectable({
	providedIn: 'root',
})
export class OfficeService {
	constructor(private _companyService: CompanyApiService, private _officeService: OfficeApiService) {}

	public createOffice(body: CreateOfficeRequest): Observable<OperationResultResponse> {
		return this._officeService.createOffice({ body });
	}

	public findOffices(params: IFindRequestEx): Observable<FindResultResponseOfficeInfo> {
		return this._companyService.findOffices(params);
	}
}
