import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileApiService } from '@api/file-service/services/file-api.service';
import { FileInfo } from '@api/file-service/models/file-info';
import { EditFileRequest } from '@api/file-service/models/edit-file-request';
import { OperationResultResponse } from '@api/file-service/models/operation-result-response';

interface IEditFileRequest {
	fileId: string;
	body: EditFileRequest;
}

@Injectable({
	providedIn: 'root',
})
export class FileService {
	constructor(private _fileService: FileApiService) {}

	// public addNewFile(body: AddFileRequest): Observable<string> {
	// 	return this._fileService.addFile({ body });
	// }

	public editFile(params: IEditFileRequest): Observable<OperationResultResponse> {
		return this._fileService.editFile(params);
	}

	public getFile(filesIds: string[]): Observable<FileInfo[]> {
		return this._fileService.getFile({ filesIds });
	}

	// public disableFile(params: IDisableFileRequest): Observable<void> {
	// 	return this._fileService.disableFile(params);
	// }
}
