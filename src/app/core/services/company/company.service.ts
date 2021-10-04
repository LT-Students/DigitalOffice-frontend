import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { OperationResultResponse } from '@data/api/company-service/models/operation-result-response';
import { CompanyApiService } from '@data/api/company-service/services/company-api.service';
import { CreateCompanyRequest } from '@data/api/company-service/models/create-company-request';
import { IGetCompanyRequest } from '@app/types/get-company-request.interface';
import { OperationResultResponseCompanyInfo } from '@data/api/company-service/models/operation-result-response-company-info';
import { EditCompanyRequest } from '@data/api/company-service/models/edit-company-request';
import { Company, CompanyInfo } from '@app/models/company';
import { tap } from 'rxjs/operators';
import { FindResultResponseOfficeInfo } from '@data/api/company-service/models/find-result-response-office-info';

@Injectable({
	providedIn: 'root',
})
export class CompanyService {
	private _company: BehaviorSubject<Company | null>;

	constructor(private _companyService: CompanyApiService) {
		this._company = new BehaviorSubject<Company | null>(null);
	}

	public createCompany(body: CreateCompanyRequest): Observable<OperationResultResponse> {
		return this._companyService.createCompany({ body });
	}

	public getCompany(params?: IGetCompanyRequest): Observable<OperationResultResponseCompanyInfo> {
		return this._companyService.getCompany(params).pipe(
			tap((response: OperationResultResponseCompanyInfo) => {
				if (response.body) {
					this._setCompany(response.body);
				}
			})
		);
	}

	public findOffices(params: IFindRequestEx): Observable<FindResultResponseOfficeInfo> {
		return this._companyService.findOffices(params);
	}

	public editCompany(body: EditCompanyRequest): Observable<OperationResultResponse> {
		return this._companyService.editCompany({ body });
	}

	public isCompanyExists(): boolean {
		return !!this._company.value;
	}

	//TODO create separate service for current company?
	public getPortalName(): string {
		return this._company.value && this._company.value.portalName ? this._company.value.portalName : '404. Это портал.';
	}

	public getCompanyName(): string {
		return this._company.value && this._company.value?.companyName
			? this._company.value?.companyName
			: 'Company Name';
	}

	private _setCompany(companyInfo: CompanyInfo): void {
		const company = new Company(companyInfo);
		this._company.next(company);
	}
}
