import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CompanyApiService } from '@api/company-service/services/company-api.service';
import { CreateCompanyRequest } from '@api/company-service/models/create-company-request';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { switchMap } from 'rxjs/operators';
import { Company } from '@app/models/company';
import { CompanyPath, EditRequest } from '@app/types/edit-request';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';
import { CompanyResponse } from '@api/company-service/models/company-response';

@Injectable({
	providedIn: 'root',
})
export class CompanyService {
	constructor(private _companyService: CompanyApiService, private _responseService: ResponseMessageModel) {}

	public createCompany(body: CreateCompanyRequest): Observable<OperationResultResponse> {
		return this._companyService
			.createCompany({ body })
			.pipe(this._responseService.message(MessageTriggeredFrom.Company, MessageMethod.Create));
	}

	public getCompany(params?: { includeoffices: boolean }): Observable<Company> {
		return this._companyService
			.getCompany({ ...params })
			.pipe(switchMap((res) => of(new Company(res.body as CompanyResponse))));
	}

	public editCompany(
		companyId: string,
		editRequest: EditRequest<CompanyPath>
	): Observable<OperationResultResponse> {
		return this._companyService.editCompany({ companyId: companyId, body: editRequest });
	}
}
