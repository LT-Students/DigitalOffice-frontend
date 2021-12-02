import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CompanyApiService } from '@data/api/company-service/services/company-api.service';
import { CreateCompanyRequest } from '@data/api/company-service/models/create-company-request';
import { IGetCompanyRequest } from '@app/types/get-company-request.interface';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { switchMap } from 'rxjs/operators';
import { Company } from '@app/models/company';
import { CompanyPath, EditRequest } from '@app/types/edit-request';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';

@Injectable({
	providedIn: 'root',
})
export class CompanyService {
	constructor(private _companyService: CompanyApiService, private _responseService: ResponseMessageModel) {}

	public createCompany(body: CreateCompanyRequest): Observable<OperationResultResponse<null | {}>> {
		return this._companyService
			.createCompany({ body })
			.pipe(this._responseService.message(MessageTriggeredFrom.Company, MessageMethod.Create));
	}

	public getCompany(params?: IGetCompanyRequest): Observable<Company> {
		return this._companyService.getCompany(params).pipe(switchMap((res) => of(new Company(res.body))));
	}

	public editCompany(editRequest: EditRequest<CompanyPath>): Observable<OperationResultResponse<null | {}>> {
		return this._companyService.editCompany({ body: editRequest });
	}
}
