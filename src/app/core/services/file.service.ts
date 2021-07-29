import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileApiService } from '@data/api/file-service/services/file-api.service';
import { File } from '@data/api/file-service/models/file';
import { IGetFileRequest } from '@app/types/get-file-request.interface';
import { IDisableFileRequest } from '@app/types/disable-file-request.interface';



@Injectable({
	providedIn: 'root',
})
export class OfficeService {
	constructor(private _fileService: FileApiService) {}

	public addNewFile(body: File): Observable<string> {
		return this._fileService.addNewFile({ body });
	}

	public getFile(params: IGetFileRequest): Observable<File[]> {
		return this._fileService.getFileById(params);
	}

	public disableFile(params: IDisableFileRequest): Observable<void> {
		return this._fileService.disableFileById(params);
	}
}
