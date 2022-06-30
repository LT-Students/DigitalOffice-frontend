import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateOfficeRequest } from '@api/office-service/models/create-office-request';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { OfficeApiService } from '@api/office-service/services/office-api.service';
import { ResponseMessageModel } from '@app/models/response/response-message.model';
import { MessageMethod, MessageTriggeredFrom } from '@app/models/response/response-message';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { OfficeInfo } from '@api/office-service/models/office-info';
import { UUID } from '@app/types/uuid.type';
import { EditRequest, OfficePath } from '@app/types/edit-request';
import { UserOfficeApiService } from '@api/office-service/services/user-office-api.service';
import { ChangeUserOfficeRequest } from '@api/office-service/models/change-user-office-request';

@Injectable({
	providedIn: 'root',
})
export class OfficeService {
	constructor(
		private officeService: OfficeApiService,
		private userOfficeApiService: UserOfficeApiService,
		private _responseMessage: ResponseMessageModel
	) {}

	public createOffice(body: CreateOfficeRequest): Observable<OperationResultResponse> {
		return this.officeService
			.createOffice({ body })
			.pipe(this._responseMessage.message(MessageTriggeredFrom.Office, MessageMethod.Create));
	}

	public findOffices(params: IFindRequestEx): Observable<OperationResultResponse<OfficeInfo[]>> {
		return this.officeService.findOffices(params);
	}

	public editOffice(officeId: UUID, editParams: EditRequest<OfficePath>): Observable<OperationResultResponse> {
		return this.officeService.editOffice({ officeId: officeId, body: editParams });
	}

	public deleteOffice(officeId: UUID): Observable<OperationResultResponse> {
		return this.editOffice(officeId, [{ op: 'replace', path: OfficePath.IS_ACTIVE, value: false }]).pipe(
			this._responseMessage.message(MessageTriggeredFrom.Office, MessageMethod.Remove)
		);
	}

	public restoreOffice(officeId: UUID): Observable<OperationResultResponse> {
		return this.editOffice(officeId, [{ op: 'replace', path: OfficePath.IS_ACTIVE, value: true }]).pipe(
			this._responseMessage.message(MessageTriggeredFrom.Office, MessageMethod.Restore)
		);
	}

	public changeUserOffice(params: ChangeUserOfficeRequest): Observable<OperationResultResponse> {
		return this.userOfficeApiService.changeOffice({ body: params });
	}
}
