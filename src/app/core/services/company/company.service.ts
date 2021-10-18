import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { CompanyApiService } from '@data/api/company-service/services/company-api.service';
import { CreateCompanyRequest } from '@data/api/company-service/models/create-company-request';
import { IGetCompanyRequest } from '@app/types/get-company-request.interface';
import { EditCompanyRequest } from '@data/api/company-service/models/edit-company-request';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { OfficeInfo } from '@data/api/company-service/models/office-info';
import { switchMap } from 'rxjs/operators';
import { Company } from '@app/models/company';

@Injectable({
	providedIn: 'root',
})
export class CompanyService {
	constructor(private _companyService: CompanyApiService) {}

	public createCompany(body: CreateCompanyRequest): Observable<OperationResultResponse<null | {}>> {
		return this._companyService.createCompany({ body });
	}

	public getCompany(params?: IGetCompanyRequest): Observable<Company> {
		return this._companyService.getCompany(params).pipe(switchMap((res) => of(new Company(res.body))));
	}

	public findOffices(params: IFindRequestEx): Observable<OperationResultResponse<OfficeInfo[]>> {
		return this._companyService.findOffices(params);
	}

	public editCompany(body: EditCompanyRequest): Observable<OperationResultResponse<null | {}>> {
		return this._companyService.editCompany({ body });
	}
}
