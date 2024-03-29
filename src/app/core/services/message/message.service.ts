import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageApiService } from '@api/message-service/services/message-api.service';
import { WorkspaceApiService } from '@api/message-service/services/workspace-api.service';
import { Workspace } from '@api/message-service/models/workspace';
import { OperationResultResponse } from '@api/message-service/models/operation-result-response';
import { EditEmailTemplateRequest } from '@api/message-service/models/edit-email-template-request';
import { EmailTemplateRequest } from '@api/message-service/models/email-template-request';

export interface IRemoveEmailTemplateRequest {
	/**
	 * Email template global unique identifier.
	 */
	emailTemplateId: string;
}

export interface IRemoveWorkspaceRequest {
	/**
	 * User global unique identifier.
	 */
	workspaceId: string;
}

@Injectable({
	providedIn: 'root',
})
export class MessageService {
	constructor(private _messageService: MessageApiService, private _workspaceService: WorkspaceApiService) {}

	public addEmailTemplate(body: EmailTemplateRequest): Observable<string> {
		return this._messageService.addEmailTemplate({ body });
	}

	public editEmailTemplate(body: EditEmailTemplateRequest): Observable<void> {
		return this._messageService.editEmailTemplate({ body });
	}

	public removeEmailTemplate(params: IRemoveEmailTemplateRequest): Observable<void> {
		return this._messageService.removeEmailTemplate(params);
	}

	public createWorkspace(body: Workspace): Observable<string> {
		return this._workspaceService.create({ body });
	}

	public removeWorkspace(params: IRemoveWorkspaceRequest): Observable<OperationResultResponse> {
		return this._workspaceService.remove(params);
	}
}
