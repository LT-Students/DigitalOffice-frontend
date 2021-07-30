import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { OperationResultResponse } from '@data/api/company-service/models/operation-result-response';
import { FindResultResponseDepartmentInfo } from '@data/api/company-service/models/find-result-response-department-info';
import { CompanyApiService } from '@data/api/company-service/services/company-api.service';
import { CreateCompanyRequest } from '@data/api/company-service/models/create-company-request';
import { IGetCompanyRequest } from '@app/types/get-company-request.interface';
import { OperationResultResponseCompanyInfo } from '@data/api/company-service/models/operation-result-response-company-info';
import { EditCompanyRequest } from '@data/api/company-service/models/edit-company-request';

@Injectable({
	providedIn: 'root',
})
export class DepartmentService {
	constructor(private _companyService: CompanyApiService) {}

	public createCompany(body: CreateCompanyRequest): Observable<OperationResultResponse> {
		return this._companyService.createCompany({ body });
	}

	public getCompany(params: IGetCompanyRequest): Observable<OperationResultResponseCompanyInfo> {
		return this._companyService.getCompany(params);
	}

	public findOffices(params: IFindRequestEx): Observable<FindResultResponseDepartmentInfo> {
		return this._companyService.findOffices(params);
	}

	public editCompany(body: EditCompanyRequest): Observable<OperationResultResponse> {
		return this._companyService.editCompany({ body });
	}
}
