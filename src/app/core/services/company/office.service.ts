import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyApiService } from '@api/office-service/services/company-api.service';
import { CreateOfficeRequest } from '@api/office-service/models/create-office-request';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { OfficeApiService } from '@api/office-service/services/office-api.service';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { OfficeInfo } from '@api/office-service/models/office-info';
import { UUID } from '@app/types/uuid.type';
import { EditRequest, OfficePath } from '@app/types/edit-request';

@Injectable({
	providedIn: 'root',
})
export class OfficeService {
	constructor(
		private _companyService: CompanyApiService,
		private _officeService: OfficeApiService,
		private _responseMessage: ResponseMessageModel
	) {}

	public createOffice(body: CreateOfficeRequest): Observable<OperationResultResponse<any>> {
		return this._officeService
			.createOffice({ body })
			.pipe(this._responseMessage.message(MessageTriggeredFrom.Office, MessageMethod.Create));
	}

	public findOffices(params: IFindRequestEx): Observable<OperationResultResponse<OfficeInfo[]>> {
		return this._companyService.findOffices(params);
	}

	public editOffice(officeId: UUID, editParams: EditRequest<OfficePath>): Observable<OperationResultResponse<any>> {
		return this._officeService.editOffice({ officeId: officeId, body: editParams });
	}

	public deleteOffice(officeId: UUID): Observable<OperationResultResponse<any>> {
		return this.editOffice(officeId, [{ op: 'replace', path: OfficePath.IS_ACTIVE, value: false }]).pipe(
			this._responseMessage.message(MessageTriggeredFrom.Office, MessageMethod.Remove)
		);
	}

	public restoreOffice(officeId: UUID): Observable<OperationResultResponse<any>> {
		return this.editOffice(officeId, [{ op: 'replace', path: OfficePath.IS_ACTIVE, value: true }]).pipe(
			this._responseMessage.message(MessageTriggeredFrom.Office, MessageMethod.Restore)
		);
	}
}
