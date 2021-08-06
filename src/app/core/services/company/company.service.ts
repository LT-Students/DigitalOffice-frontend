import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { OperationResultResponse } from '@data/api/company-service/models/operation-result-response';
import { FindResultResponseDepartmentInfo } from '@data/api/company-service/models/find-result-response-department-info';
import { CompanyApiService } from '@data/api/company-service/services/company-api.service';
import { CreateCompanyRequest } from '@data/api/company-service/models/create-company-request';
import { IGetCompanyRequest } from '@app/types/get-company-request.interface';
import { OperationResultResponseCompanyInfo } from '@data/api/company-service/models/operation-result-response-company-info';
import { EditCompanyRequest } from '@data/api/company-service/models/edit-company-request';
import { Company, CompanyInfo } from '@app/models/company';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class CompanyService {
	private _company: BehaviorSubject<Company>;

	constructor(private _companyService: CompanyApiService) {
		this._company = new BehaviorSubject<Company>(null);
	}

	public createCompany(body: CreateCompanyRequest): Observable<OperationResultResponse> {
		return this._companyService.createCompany({ body });
	}

	public getCompany(params?: IGetCompanyRequest): Observable<OperationResultResponseCompanyInfo> {
		return this._companyService
			.getCompany(params)
			.pipe(tap((response: OperationResultResponseCompanyInfo) => this._setCompany(response.body)));
	}

	public findOffices(params: IFindRequestEx): Observable<FindResultResponseDepartmentInfo> {
		return this._companyService.findOffices(params);
	}

	public editCompany(body: EditCompanyRequest): Observable<OperationResultResponse> {
		return this._companyService.editCompany({ body });
	}

	public getCurrentCompany(): Company {
		return this._company.value;
	}

	//TODO create separate service with global variables like portal name?
	public getPortalName(): string {
		return this._company.value.portalName;
	}

	private _setCompany(companyInfo: CompanyInfo): void {
		const company = new Company(companyInfo);
		this._company.next(company);
	}
}
