import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileApiService } from '@data/api/file-service/services/file-api.service';
import { IDisableFileRequest } from '@app/types/disable-file-request.interface';
import { FileInfo } from '@data/api/file-service/models/file-info';
import { AddFileRequest } from '@data/api/file-service/models/add-file-request';

@Injectable({
	providedIn: 'root',
})
export class FileService {
	constructor(private _fileService: FileApiService) {}

	public addNewFile(body: AddFileRequest): Observable<string> {
		return this._fileService.addFile({ body });
	}

	public getFile(fileId: string): Observable<FileInfo[]> {
		return this._fileService.getFile({ fileId });
	}

	public disableFile(params: IDisableFileRequest): Observable<void> {
		return this._fileService.disableFile(params);
	}
}
