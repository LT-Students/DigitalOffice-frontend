import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CompanyApiService } from '@data/api/company-service/services/company-api.service';
import { CreateCompanyRequest } from '@data/api/company-service/models/create-company-request';
import { IGetCompanyRequest } from '@app/types/get-company-request.interface';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { switchMap } from 'rxjs/operators';
import { Company } from '@app/models/company';
import { CompanyPath, EditRequest } from '@app/types/edit-request';

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

	public editCompany(editRequest: EditRequest<CompanyPath>): Observable<OperationResultResponse<null | {}>> {
		return this._companyService.editCompany({ body: editRequest });
	}
}
